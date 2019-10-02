import React from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Icon,
  Spin,
  Select
} from "antd";

import { postMapping, getDatasources } from "../api/MastroApi";
import UploadFile from "./UploadFile";

/*ROBBA MIA*/
import { Tabs } from "antd";
const { TabPane } = Tabs;

class MyDrawer extends React.Component {
  state = { datasources: [], visible: false, loading: true, activeTab: "1" };

  componentDidMount() {
    getDatasources(this.loaded);
  }

  loaded = datasources => {
    this.setState({ loading: false, datasources });
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  changeTab = activeKey => {
    this.setState({
      activeTab: activeKey
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
    this.props.rerender();
  };

  callback = key => {
    if (key === "1") {
      console.log("Aggiungi un Mapping");
    } else {
      console.log("Creane uno nuovo");
    }
  };

  submit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const mapping = {
          id: values.id,
          version: values.version,
          description: values.description,
          databaseConnectionName: values.datasource,
          mappingTemplates: [],
          prefixes: []
        };
        postMapping(
          this.props.current.name,
          this.props.current.version,
          mapping,
          this.onClose
        );
      }
    });
  };

  uploaded = uploadedResponse => {
    this.props.form.setFieldsValue({
      id: uploadedResponse.mappingInfo.mapping.mappingID,
      description: uploadedResponse.mappingInfo.mapping.mappingDescription,
      version: uploadedResponse.mappingInfo.mapping.mappingVersion,
      datasource: uploadedResponse.mappingInfo.mappingDBConnections[0].name
    });
    if (uploadedResponse.success) {
      this.setState({
        visible: false
      });
      this.props.rerender();
    }
  };
  changeTab = activeKey => {
    this.setState({
      activeTab: activeKey
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return this.state.loading ? (
      <div
        style={{ display: "flex", justifyContent: "center", paddingTop: 36 }}
      >
        {" "}
        <Spin size="large" />
      </div>
    ) : (
      <div>
        <Button
          type="primary"
          style={{ height: 270, width: "100%" }}
          onClick={this.showDrawer}
        >
          <Icon type="plus" /> Add Mapping
        </Button>

        <Drawer
          title="Create a new mapping"
          width="40vw"
          onClose={this.onClose}
          visible={this.state.visible}
          style={{
            overflow: "auto"
          }}
        >
          <Tabs activeKey={this.state.activeTab} onChange={this.changeTab}>
            <TabPane tab="Mapping Import" key="1">
              <div
                onClick={() => this.changeTab("2")}
                style={{ paddingBottom: 12 }}
              >
                <UploadFile
                  type="mapping"
                  current={this.props.current}
                  rerender={this.uploaded}
                />
              </div>
            </TabPane>
            <TabPane tab="Mapping Creator" key="2">
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="ID">
                      {getFieldDecorator("id", {
                        rules: [
                          {
                            required: true,
                            message: "Please enter version id"
                          },
                          {
                            pattern: /^[A-Za-z][A-Za-z0-9_]*$/,
                            message:
                              "You can use only letters numbers and underscore."
                          }
                        ]
                      })(<Input placeholder="Please enter mapping id" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="Version">
                      {getFieldDecorator("version", {
                        rules: [
                          {
                            required: false,
                            message: "Please enter mapping version"
                          }
                        ]
                      })(<Input placeholder="Please enter mapping version" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="Description">
                      {getFieldDecorator("description", {
                        rules: [
                          {
                            required: false,
                            message: "Please enter mapping description"
                          }
                        ]
                      })(
                        <Input.TextArea
                          rows={4}
                          placeholder="Please enter mapping description"
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Datasource">
                      {getFieldDecorator("datasource", {
                        rules: [
                          {
                            required: true,
                            message: "Please enter a datasource"
                          }
                        ]
                      })(
                        <Select>
                          {this.state.datasources.map(item => (
                            <Select.Option key={item.id} value={item.id}>
                              {item.id}
                            </Select.Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  borderTop: "1px solid #e9e9e9",
                  padding: "10px 16px",
                  textAlign: "right",
                  background: "var(--light)"
                }}
              >
                <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button onClick={this.submit} type="primary">
                  Submit
                </Button>
              </div>
            </TabPane>
          </Tabs>
        </Drawer>
      </div>
    );
  }
}

const AddMapping = Form.create()(MyDrawer /*DrawerForm*/);

export default AddMapping;
