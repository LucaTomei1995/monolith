import React from "react";
import { Layout, Drawer, Button } from "antd";
import SearchList from "./FastSearchList";
import SQLViewsPage from "./SQLViewsPage";
import AddSQLView from "./AddSQLView";

const { Content } = Layout;

export default class SQLViewsPane extends React.Component {
  state = {
    current: null,
    visible: true,
    visibleEdit: false,
    sqlView: null
  };

  toggle = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  toggleEdit = sqlView => {
    this.setState({
      visibleEdit: !this.state.visibleEdit,
      drawer: (
        <AddSQLView
          ontology={this.props.ontology}
          mappingID={this.props.mappingID}
          sqlView={sqlView}
          success={this.toggleEdit}
        />
      )
    });
  };

  onHandle = viewID => {
    this.setState({
      current: viewID,
      visible: false
    });
  };

  delete = () => {
    this.setState({
      visible: true,
      current: null
    });
  };

  render() {
    return (
      <Layout>
        <Drawer
          title="SQL Views"
          visible={this.state.visible}
          onClose={this.toggle}
          width={this.state.visibleEdit ? "60vw" : "50vw"}
        >
          <Button
            style={{ float: "right", backgroundColor: "transparent" }}
            onClick={this.toggleEdit}
            icon="plus"
            shape="circle"
          />
          <SearchList
            ontology={this.props.ontology}
            mappingID={this.props.mappingID}
            onHandle={this.onHandle}
          />
        </Drawer>
        <Drawer
          title="Add SQL View"
          visible={this.state.visibleEdit}
          onClose={this.toggleEdit}
          width={"60vw"}
          destroyOnClose={true}
        >
          {this.state.drawer}
        </Drawer>
        <Layout>
          <Content>
            <div>
              <Button
                type="primary"
                style={{ float: "right", margin: 8 }}
                icon="menu-fold"
                onClick={this.toggle}
              />
              {this.state.current !== null && (
                <SQLViewsPage
                  ontology={this.props.ontology}
                  mappingID={this.props.mappingID}
                  viewID={this.state.current}
                  edit={this.toggleEdit}
                  delete={this.delete}
                  destroyOnClose={true}
                />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
