import React from "react";
import { Form, Button, Col, Row, Input, Select, Menu } from "antd";
import {
  getMappingViews,
  postMappingAssertion,
  putMappingAssertion
} from "../api/MastroApi";
import { predicateTypes } from "../utils/utils";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/styles/hljs";
import sqlFormatter from "sql-formatter";

let built_in_predicates = [
  "GREATER_THAN",
  "GREATER_EQUAL_THAN",
  "LESS_THAN",
  "LESS_EQUAL_THAN",
  "EQUALS",
  "NOT_EQUALS",
  "IS_NULL",
  "IS_NOT_NULL",
  "NOT_IN",
  "BETWEEN",
  "LIKE",
  "NOT_LIKE",
  "OP_FUNCTION",
  "SF_WITHIN",
  "SF_CONTAINS",
  "SF_INTERSECT"
];
let id = 1;

class AssertionForm extends React.Component {
  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  state = {
    mappingViews: []
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
  }

  loaded = mappingViews => {
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
            this.props.rerender // can use data-binding to get
          );
      }
    });
  };

  onSelect = value => {
    this.setState({
      selectedView: this.state.mappingViews.filter(
        v => v.sqlViewID === value
      )[0]
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator("keys", { initialValue: [0] });
    const keys = getFieldValue("keys");
    const formItems = keys.map((k, index) => (
      <Row gutter={16} key={"row" + k}>
        <Col span={12}>
          <Form.Item label="Body" required={index === 0 ? true : false} key={k}>
            {getFieldDecorator(`names[${k}]`, {
              rules: [
                { required: false, message: "Please enter datasource name" }
              ]
            })(
              <Select showSearch onSelect={this.onSelect}>
                {this.state.mappingViews.map(view => (
                  <Select.Option value={view.sqlViewID} key={view.sqlViewID}>
                    {view.sqlViewID}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
        {keys.length > 1 ? (
          <Col span={2}>
            <Button
              style={{
                float: "right",
                backgroundColor: "transparent",
                marginTop: "75%"
              }}
              onClick={() => this.remove(k)}
              icon="minus"
              shape="circle"
            />
          </Col>
        ) : null}
      </Row>
    ));
    const builtInPredicatesMenuItems = built_in_predicates.map((elem, k) => (
      <Menu.Item key={k}>{elem}</Menu.Item>
    ));
    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Form layout="vertical">
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
                    <Col span={16}>
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
              {formItems}
              <Button
                style={{ backgroundColor: "transparent" }}
                onClick={() => this.add()}
                icon="plus"
                shape="circle"
                title="Add a body"
              ></Button>

              {this.state.selectedView && (
                <SyntaxHighlighter language="sql" style={darcula}>
                  {sqlFormatter.format(this.state.selectedView.sqlViewCode)}
                </SyntaxHighlighter>
              )}
            </Form>
          </Col>
          <Col span={6}>
            <label>Built in predicates</label>
            <Menu
              onClick={null}
              style={{ width: 200, height: 300, overflow: "scroll" }}
              defaultSelectedKeys={["0"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="dark"
            >
              {builtInPredicatesMenuItems}
            </Menu>
          </Col>
        </Row>
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
