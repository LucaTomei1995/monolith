import React from "react";
import { Table, Form, Button, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  postMappingViews,
  putMappingView,
  postSQLEx,
  getTableResult,
  getDatasources
} from "../api/MastroApi";

import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
import "../css/codeMirror.css";

var CodeMirror = require("react-codemirror");

class CodeEditorField extends React.Component {
  componentDidMount() {
    if (this.props.sqlView) {
      const values = this.props.sqlView;
      this.props.form.setFieldsValue({
        name: values.sqlViewID,
        description: values.sqlViewDescription,
        code: values.sqlViewCode
      });
      getDatasources(this.setJdbDriverEntry);
      const codemirrorStyle = document.querySelector(".CodeMirror-scroll");

      codemirrorStyle.classList.add("ant-input");

      var mirrorvalue = this.props.sqlView.sqlViewCode
        ? this.props.sqlView.sqlViewCode
        : "";
      var codemirror = document.querySelector(".CodeMirror").CodeMirror;
      codemirror.setValue(mirrorvalue);
    }
  }

  setJdbDriverEntry = x => {
    var jdbcDB = x[0]["id"];
    var jdbcDriver = x[0]["jdbcDriver"];
    var jdbcUrl = x[0]["jdbcUrl"];
    var jdbcUsername = x[0]["jdbcUsername"];
    var jdbcPassword = x[0]["jdbcPassword"];
    this.setState({
      jdbcEntry: {
        jdbcDB: jdbcDB,
        jdbcUrl: jdbcUrl,
        jdbcDriver: jdbcDriver,
        jdbcUsername: jdbcUsername,
        jdbcPassword: jdbcPassword
      }
    });

    getTableResult(
      this.props.ontology.version,
      this.props.mappingID,
      this.state.jdbcEntry,
      this.getAutoComplete
    );
  };
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      testSqlQuery: this.props.sqlView.code,
      renderTestSqlQuery: "",
      render: true,
      dataSource: [],
      sqlColumns: [],
      sqlTables: [],
      jdbcEntry: [
        {
          jdbcDB: null,
          jdbcUrl: null,
          jdbcDriver: null,
          jdbcUsername: null,
          jdbcPassword: null
        }
      ]
    };
  }
  getAutoComplete = dbResult => {
    var tab = dbResult;
    var numElements = tab["tables"].length;
    var retDict = [];
    for (var i = 0; i < numElements; i++) {
      var tableName = tab["tables"][i]["name"];
      var listAttributes = tab["tables"][i]["attributes"];
      var numAttributesInTable = listAttributes.length;
      retDict.push({ text: tableName, displayText: tableName }); // name:nometabella,

      for (var j = 0; j < numAttributesInTable; j++) {
        retDict.push({
          text: listAttributes[j],
          displayText: listAttributes[j] + " - (Attribute of " + tableName + ")"
        }); // name:nometabella,
      }
    }

    var sqlList = [
      "ALTER",
      "AND",
      "AS",
      "ASC",
      "BETWEEN",
      "BY",
      "COUNT",
      "CREATE",
      "DELETE",
      "DESC",
      "DISTINCT",
      "DROP",
      "FROM",
      "GROUP",
      "HAVING",
      "IN",
      "INSERT",
      "INTO",
      "IS",
      "JOIN",
      "LIKE",
      "NOT",
      "ON",
      "OR",
      "ORDER",
      "SELECT",
      "SET",
      "TABLE",
      "UNION",
      "UPDATE",
      "VALUES",
      "WHERE",
      "LIMIT"
    ];
    for (var k = 0; k < sqlList.length; k++)
      retDict.push({ text: sqlList[k], displayText: sqlList[k] });

    this.setState({ sqlTables: retDict });
  };

  autoComplete = cm => {
    const codeMirror = this.refs["CodeMirror"].getCodeMirrorInstance();
    const hintOptions = {
      tables: this.state.sqlTables,
      disableKeywords: true,
      completeSingle: false,
      completeOnSingleClick: false
    };
    codeMirror.showHint(cm, codeMirror.hint.sql, hintOptions);
  };

  test = queryResult => {
    this.setState({ dataSource: [] }); // Nuova tabella
    this.setState({ sqlColumns: [] }); // Nuova tabella
    var tmp = queryResult.split("\n");
    var numResults = tmp.length;
    var numAttributi = function(queryResultSplitted) {
      var res = 0;
      var tmp = queryResultSplitted[0];
      for (var i = 0; i < tmp.length; i++) {
        if (tmp[i].includes("|")) res += 1;
      }
      return res;
    };
    var qualiAttributi = function(queryResultSplitted) {
      return queryResultSplitted[0].split("|");
    };

    var dataSource = [];

    if (numAttributi(tmp) !== 0) {
      var innerColumns = [];
      for (var i = 0; i < numAttributi(tmp); i++) {
        innerColumns[i] = {
          title: qualiAttributi(tmp)[i],
          dataIndex: qualiAttributi(tmp)[i]
        };
      }
      this.setState({ sqlColumns: innerColumns });
      for (var k = 0; k < numResults; k++) {
        dataSource[k] = { key: k };
        if (k >= 1) {
          for (var j = 0; j < numAttributi(tmp); j++)
            dataSource[k][qualiAttributi(tmp)[j]] = tmp[k].split("|")[j];
        }
      }
    } else {
      message.error("Error on query Result");
    }
    this.setState({ dataSource: dataSource }); // Nuova tabella
    this.setState({ showing: true });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const sqlView = {
          sqlViewID: values.name,
          sqlViewDescription: values.description,
          sqlViewCode: document
            .querySelector(".CodeMirror")
            .CodeMirror.getValue()
        };
        if (this.props.sqlView.sqlViewID) {
          putMappingView(
            this.props.ontology.name,
            this.props.ontology.version,
            this.props.mappingID,
            this.props.sqlView.sqlViewID,
            sqlView,
            this.props.success
          );
        } else {
          postMappingViews(
            this.props.ontology.name,
            this.props.ontology.version,
            this.props.mappingID,
            sqlView,
            this.props.success
          );
        }
      }
    });
  };

  handleClick = e => {
    // this.state.textVal = CodeMirror.getValue();

    postSQLEx(
      document.querySelector(".CodeMirror").CodeMirror.getValue(), //this.state.textVal,
      this.props.ontology.version,
      this.props.mappingID,
      this.state.jdbcEntry,
      this.test
    );

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && this.state.render) {
        this.setState({ render: false });
        this.setState({ renderTestSqlQuery: this.state.testSqlQuery });
      }
    });
  };

  handleChange = value => {};

  render() {
    const { showing } = this.state;

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const options = {
      lineNumbers: true,
      mode: "sql",
      tabSize: 2,
      readOnly: false,
      cursorHeight: 0.85,
      extraKeys: {
        "Ctrl-Space": this.autoComplete
      }
    };
    return (
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit}
        style={{ maxWidth: 800 }}
      >
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please select sql view name"
              }
            ]
          })(<TextArea autosize={{ minRows: 1 }} />)}
        </Form.Item>
        <Form.Item label="SQL Code">
          <CodeMirror
            ref="CodeMirror"
            onChange={this.handleChange}
            options={options}
          />
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator("description", {
            rules: [
              {
                required: false
              }
            ]
          })(<TextArea autosize={{ minRows: 1 }} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          &nbsp;
          <Button type="secondary" htmlType="button" onClick={this.handleClick}>
            Test Query
          </Button>
        </Form.Item>
        {showing ? (
          <div>
            <Table
              dataSource={this.state.dataSource}
              columns={this.state.sqlColumns}
            />
            ;
          </div>
        ) : null}
      </Form>
    );
  }
}
const WrappedSQLViewForm = Form.create({ name: "visit" })(
  CodeEditorField /*AddSQLViewForm*/
);

export default WrappedSQLViewForm;
