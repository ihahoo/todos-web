/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import { Card, Table, Space, Checkbox, Button, Modal, Input } from "antd";
import moment from "moment";
import { makeApiSelector } from "@36node/redux";
import withBreadCrumb from "../../components/withBreadCrumb";
import { todos } from "../../actions/api";
import { domain } from "../../constants";

const TODOS_KEY = domain.todo.todos;
const CREATE_KEY = domain.todo.create;
const DELETE_KEY = domain.todo.delete;
const UPDATE_KEY = domain.todo.update;

const listTodos = todos.makeListTodos(TODOS_KEY);
const createTodo = todos.makeCreateTodo(CREATE_KEY, {}, { parallel: true });
const deleteTodo = todos.makeDeleteTodo(DELETE_KEY, {}, { parallel: true });
const updateTodo = todos.makeUpdateTodo(UPDATE_KEY);

let listSelector = makeApiSelector(TODOS_KEY);
let createSelector = makeApiSelector(CREATE_KEY);
let deleteSelector = makeApiSelector(DELETE_KEY);
let updateSelector = makeApiSelector(UPDATE_KEY);

@connect((state, props) => ({
  listState: listSelector(state),
  createState: createSelector(state),
  deleteState: deleteSelector(state),
  updateState: updateSelector(state),
}))
@withBreadCrumb("Todos")
export default class extends React.PureComponent {
  state = {
    isShowAddModal: false,
    todoText: "",
    id: "",
  };

  componentDidMount() {
    this.props.dispatch(listTodos());
  }

  componentDidUpdate(prevProps) {
    const { createState, dispatch, deleteState } = this.props;
    if (
      prevProps.createState.loading &&
      !createState.loading &&
      createState.result &&
      createState.result.id
    ) {
      dispatch(listTodos());
    }

    if (
      prevProps.deleteState.loading &&
      !deleteState.loading &&
      !deleteState.error &&
      !deleteState.result
    ) {
      dispatch(listTodos());
    }
  }

  handleOk = () => {
    const { todoText, id } = this.state;
    const { dispatch } = this.props;
    if (todoText && todoText.length > 0) {
      if (id) {
        dispatch(updateTodo({ todoId: id, body: { todo: todoText } }));
      } else {
        dispatch(createTodo({ body: { todo: todoText } }));
      }
    }

    this.setState({ isShowAddModal: false, todoText: "", id: "" });
  };

  handleCancel = () => {
    this.setState({ isShowAddModal: false, todoText: "", id: "" });
  };

  handleSetStatus = (id, status) => {
    if (id && status) {
      let toStatus = "open";
      if (status === "open") toStatus = "close";
      this.props.dispatch(
        updateTodo({ todoId: id, body: { status: toStatus } })
      );
    }
  };

  render() {
    const { listState } = this.props;
    const { loading = false, result = [] } = listState;

    const data = result.map(v => ({
      id: v.id,
      todo: v.todo,
      createAt: moment(v.createAt).format("YYYY-MM-DD HH:mm:ss"),
      status: v.status,
    }));

    const columns = [
      {
        title: "task",
        width: "50%",
        render: (text, record) => (
          <Space size="middle">
            <Checkbox
              onChange={() => this.handleSetStatus(record.id, record.status)}
              checked={record.status === "close"}
            />
            <div
              style={
                record.status === "close"
                  ? { textDecoration: "line-through" }
                  : undefined
              }
            >
              {record.todo}
            </div>
          </Space>
        ),
      },
      {
        title: "create time",
        dataIndex: "createAt",
      },
      {
        title: "action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a
              onClick={() =>
                this.setState({
                  isShowAddModal: true,
                  todoText: record.todo,
                  id: record.id,
                })
              }
            >
              Edit
            </a>
            <a
              onClick={() =>
                this.props.dispatch(deleteTodo({ todoId: record.id }))
              }
            >
              Delete
            </a>
          </Space>
        ),
      },
    ];

    return (
      <div>
        <Card title="Todos">
          <Button
            type="primary"
            onClick={() => this.setState({ isShowAddModal: true })}
          >
            Add todo
          </Button>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={data}
            pagination={false}
            loading={loading}
          />
        </Card>
        <Modal
          title="Add Todo"
          visible={this.state.isShowAddModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            placeholder="Todo"
            value={this.state.todoText}
            onChange={e => this.setState({ todoText: e.target.value })}
          />
        </Modal>
      </div>
    );
  }
}
