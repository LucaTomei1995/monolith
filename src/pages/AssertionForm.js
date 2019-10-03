import React from "react";
import { Form, Button, Col, Row, Input, Select } from "antd";
import {
  getMappingViews,
  postMappingAssertion,
  putMappingAssertion
} from "../api/MastroApi";
import { predicateTypes } from "../utils/utils";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/styles/hljs";
import sqlFormatter from "sql-formatter";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
import "../css/codeMirror.css";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/lint.css";

var CodeMirror = require("react-codemirror");

class AssertionForm extends React.Component {
  state = {
    mappingViews: [],
    tables: []
  };

  componentDidMount() {
    getMappingViews(
      this.props.ontology.name,
      this.props.ontology.version,
      this.props.mappingID,
      this.loaded
    );
    if (this.props.assertion) {
      this.props.form.setFieldsValue({
        template: this.props.assertion.mappingHead.firstArg,
        domainTemplate: this.props.assertion.mappingHead.firstArg,
        rangeTemplate: this.props.assertion.mappingHead.secondArg,
        body: this.props.assertion.mappingBody.bodyFrom[0].sqlViewID
      });
    }
    const codemirrorStyle = document.querySelector(".CodeMirror-scroll");

    codemirrorStyle.classList.add("ant-input");
  }

  loaded = mappingViews => {
    // alert(mappingViews[0].sqlViewID);
    // alert(mappingViews.length);
    var retDict = [];
    var numElements = mappingViews.length;
    for (var i = 0; i < numElements; i++) {
      // alert(mappingViews[i].sqlViewCode);
      retDict.push({
        text: mappingViews[i].sqlViewID,
        displayText: mappingViews[i].sqlViewID
      });
    }
    var sqlList = ["FROM", "JOIN", "ON", "SELECT", "WHERE", "AND"];
    for (var j = 0; j < sqlList.length; j++)
      retDict.push({ text: sqlList[j], displayText: sqlList[j] });

    sqlList = [
      ">",
      ">=",
      "<",
      "=<",
      "=",
      "<>",
      "IS NULL",
      "IS NOT NULL",
      "NOT_IN",
      "BETWEEN",
      "LIKE",
      "NOT_LIKE"
    ];
    var sqlListText = [
      "GREATER THAN",
      "GREATER EQUAL THAN",
      "LESS THAN",
      "LESS EQUAL THAN",
      "EQUALS",
      "NOT EQUALS",
      "IS NULL",
      "IS NOT NULL",
      "NOT IN",
      "BETWEEN",
      "LIKE",
      "NOT LIKE"
    ];
    for (var k = 0; k < sqlList.length; k++)
      retDict.push({ text: sqlList[k], displayText: sqlListText[k] });

    this.setState({ tables: retDict });
    this.setState({ mappingViews });
  };

  submit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const assertion = {
          entityID: this.props.entity.entityID,
          viewName: values.body,
          template:
            this.props.type === predicateTypes.c
              ? values.template
              : values.domainTemplate,
          rangeTemplate:
            this.props.type === predicateTypes.c ? null : values.rangeTemplate
        };
        if (this.props.assertion) {
          putMappingAssertion(
            this.props.ontology.name,
            this.props.ontology.version,
            this.props.mappingID,
            this.props.assertion.id,
            assertion,
            this.props.rerender
          );
        } else
          postMappingAssertion(
            this.props.ontology.name,
            this.props.ontology.version,
            this.props.mappingID,
            assertion,
            this.props.rerender
          );
      }
    });
  };
  onClose = () => {
    this.setState({
      visible: false
    });
    this.props.rerender();
  };

  onSelect = value => {
    this.setState({
      selectedView: this.state.mappingViews.filter(
        v => v.sqlViewID === value
      )[0]
    });
  };

  // Seleziona il testo di rosso che si trova:
  // - Nella linea line
  //      - con parola che inizia in posizione fromCH
  //      - e finisce a posizione toCH
  codeMirrorMarkText = (doc, line, fromCH, toCH) => {
    doc.markText(
      {
        line: line,
        ch: fromCH
      },
      {
        line: line,
        ch: toCH
      },
      {
        css: "border-bottom: 2px red dashed;"
      }
    );
  };

  // Rimuove lo stile a tutta la textarea: gli devi passare il doc
  codeRemoveMarkedText = doc => {
    var numLines = this.howManyLinesInCodemirror(doc);
    for (var i = 0; i < numLines; i++) {
      var line = doc["children"][0]["lines"][i];
      var numElementInLine = line["text"].length;

      doc.markText(
        {
          line: i,
          ch: 0
        },
        {
          line: i,
          ch: numElementInLine
        },
        {
          css: "border-bottom: 0px !important;"
        }
      );
    }
  };

  // ritorna il numero di linee presenti nell'editor
  howManyLinesInCodemirror = doc => {
    return doc["children"][0]["lines"]["length"];
  };

  onChange = value => {
    var editor = document.querySelector(".CodeMirror").CodeMirror;
    var doc = editor.getDoc();
    var cursor = doc.getCursor(); //['line']
    var line = doc.getLine(cursor.line);
    this.codeMirrorMarkText(doc, 1, 9, 13);

    /*console.log(cursor);
        console.log(line);
        console.log(doc);*/

    var numItems = function(string) {
      var res = 0;
      var tmp = string;
      if (tmp.trim() === "") {
        return res;
      }
      for (var i = 0; i < tmp.length; i++) {
        if (tmp[i].includes(",")) res += 1;
      }
      res += 1;
      return res;
    };

    function exist(currentValue) {
      return currentValue[currentValue.length - 1] !== "\n";
    }

    function nth_occurrence(string, char, nth) {
      var first_index = string.indexOf(char);
      var length_up_to_first_index = first_index + 1;

      if (nth === 1) {
        return first_index;
      } else {
        var string_after_first_occurrence = string.slice(
          length_up_to_first_index
        );
        var next_occurrence = nth_occurrence(
          string_after_first_occurrence,
          char,
          nth - 1
        );

        if (next_occurrence === -1) {
          return -1;
        } else {
          return length_up_to_first_index + next_occurrence;
        }
      }
    }

    var optimizeMappingBody = function(string, type) {
      var select = string.trimLeft();
      var from = "";
      var where = "";
      if (select.startsWith("select")) {
        if (select.split("select")[1][0] !== " ") {
          // alert("Errore nella select");
        } else {
          if (select.includes(" from ")) {
            from = select.substr(select.indexOf(" from ")).trimLeft();
            select = select.substr(0, select.indexOf(" from "));
          } else if (select.includes("from ")) {
            if (!select.split("from ").every(exist)) {
              let temp = 0;
              select
                .split("from ")
                .forEach(function whereIsThis(currentValue, index) {
                  if (currentValue[currentValue.length - 1] === "\n") {
                    if (temp === 0) {
                      temp = index + 1;
                    }
                  }
                });
              let tempRealIndex = nth_occurrence(select, "from ", temp);
              from = select.substr(tempRealIndex);
              select = select.substr(0, tempRealIndex);
            } else {
              // alert("Errore, la query non ha una from");
            }
          } else {
            // alert("Errore, la query non ha una from");
          }
          if (from !== "" && type !== "view") {
            if (from.includes(" where ")) {
              where = from.substr(from.indexOf(" where ")).trimLeft();
              from = from.substr(0, from.indexOf(" where "));
            } else if (from.includes("where ")) {
              if (!from.split("where ").every(exist)) {
                let temp = 0;
                from
                  .split("where ")
                  .forEach(function whereIsThis(currentValue, index) {
                    if (currentValue[currentValue.length - 1] === "\n") {
                      if (temp === 0) {
                        temp = index + 1;
                      }
                    }
                  });
                let tempRealIndex = nth_occurrence(from, "where ", temp);
                where = from.substr(tempRealIndex);
                from = from.substr(0, tempRealIndex);
              }
            }
          }
        }
      } else {
        // alert("Query error");
      }
      return [select, from, where];
    };
    value = value.toLowerCase();
    var mappingSelectFromWhere = optimizeMappingBody(value, "mapping");
    if (mappingSelectFromWhere[0] !== "" && mappingSelectFromWhere[1] !== "") {
      let attributes = mappingSelectFromWhere[0].split("select ")[1];
      let views = mappingSelectFromWhere[1].split("from ")[1];
      let numAttributes = numItems(attributes);
      let numViews = numItems(views);
      attributes = attributes.split(",");
      views = views.split(",");
      for (var i = 0; i < numAttributes; i++) {
        for (var j = 0; j < numViews; j++) {
          if (
            this.state.mappingViews.filter(
              v => v.sqlViewID === views[j].trim()
            )[0]
          ) {
            let temp = optimizeMappingBody(
              this.state.mappingViews
                .filter(v => v.sqlViewID === views[j].trim())[0]
                .sqlViewCode.toLowerCase(),
              "view"
            )[0].split("select ")[1];
            let tempNum = numItems(temp);
            temp = temp.split(",");
            for (var k = 0; k < tempNum; k++) {
              if (temp[k].includes(" as ")) {
                temp[k] = temp[k].split(" as ")[1];
              } else {
                temp[k] = temp[k].split(" as ")[0];
              }

              if (temp[k].trim() === attributes[i].trim()) {
                alert("ci sta");
              }
            }
          } else {
            // alert("Hai inserito una vista non valida");
          }
        }
      }
    }
    // if(value.includes("select")){
    //     if(value.trimLeft().startsWith("select") && (value.trimLeft().split("select")[1][0] === '  ') ){
    //         alert("ciao");
    //         var attributes = value.split("select");
    //         if(attributes[1].includes("from")){
    //             var views = attributes[1].split("from")[1];
    //             attributes = attributes[1].split("from")[0];
    //             if(views.includes("where")){
    //                 var conditions = views.split("where")[1];
    //                 views = views.split("where")[0];
    //             }
    //             var numViews = numItems(views);
    //             views = views.split(",");
    //             var numAttributes = numItems(attributes);
    //             if(numAttributes != 0){
    //                 attributes = attributes.split(",");
    //                 for(var i = 0; i < numAttributes; i++){
    //                     for(var j = 0; j < numViews ; j++){
    //                         if(this.state.mappingViews.filter(v => v.sqlViewID === views[j].trim())[0]){
    //                             var temp = this.state.mappingViews.filter(v => v.sqlViewID === views[j].trim())[0].sqlViewCode.toLowerCase().split("select ");
    //                             temp = temp[1].split("from ")[0];
    //                             var tempNum = numItems(temp);
    //                             temp = temp.split(",");
    //                             for(var k = 0; k < tempNum ; k++){
    //                                 if(temp[k].includes(" as ")){
    //                                     temp[k] = temp[k].split(" as ")[1];
    //                                 }
    //                                 else{
    //                                     temp[k] = temp[k].split(" as ")[0];
    //                                 }

    //                                 if(temp[k].trim() === attributes[i].trim()){
    //                                     alert("ci sta");
    //                                 }
    //                             }
    //                         }
    //                         else{
    //                             // alert("Hai inserito una vista non valida");
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
  };

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
          displayText: "(Attributo di " + tableName + ")"
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

    this.setState({ tables: retDict });
  };

  autoComplete = cm => {
    const codeMirror = this.refs["CodeMirror"].getCodeMirrorInstance();
    const hintOptions = {
      tables: this.state.tables,
      disableKeywords: true,
      completeSingle: false,
      completeOnSingleClick: false
    };
    codeMirror.showHint(cm, codeMirror.hint.sql, hintOptions);
  };
  handleChange = value => {};

  render() {
    const { getFieldDecorator } = this.props.form;
    const options = {
      lineNumbers: true,
      mode: "sql",
      tabSize: 2,
      readOnly: false,
      extraKeys: {
        "Ctrl-Space": this.autoComplete
      }
    };
    return (
      <div>
        <CodeMirror
          ref="CodeMirror"
          onChange={this.onChange}
          options={options}
        />
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Body">
                {getFieldDecorator("body", {
                  rules: [
                    { required: true, message: "Please enter datasource name" }
                  ]
                })(
                  <Select showSearch onSelect={this.onSelect}>
                    {this.state.mappingViews.map(view => (
                      <Select.Option
                        value={view.sqlViewID}
                        key={view.sqlViewID}
                      >
                        {view.sqlViewID}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          {this.state.selectedView && (
            <SyntaxHighlighter language="sql" style={darcula}>
              {sqlFormatter.format(this.state.selectedView.sqlViewCode)}
            </SyntaxHighlighter>
          )}
          {this.props.type === predicateTypes.c && (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Template">
                  {getFieldDecorator("template", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter datasource name"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
          )}
          {this.props.type === predicateTypes.op && (
            <div>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Domain Template">
                    {getFieldDecorator("domainTemplate", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter datasource name"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Range Template">
                    {getFieldDecorator("rangeTemplate", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter datasource name"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
            </div>
          )}
          {this.props.type === predicateTypes.dp && (
            <div>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Domain Template">
                    {getFieldDecorator("domainTemplate", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter datasource name"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Range">
                    {getFieldDecorator("rangeTemplate", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter datasource name"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
            </div>
          )}
        </Form>
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            borderTop: "1px solid #e9e9e9",
            padding: "10px 16px",
            textAlign: "right"
          }}
        >
          <Button onClick={this.onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={this.submit} type="primary">
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

const WrappedAssertionForm = Form.create()(AssertionForm);

export default WrappedAssertionForm;
