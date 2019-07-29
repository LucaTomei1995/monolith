import React from 'react'
import { NavLink } from 'react-router-dom'
import { List, Card, Popover, Spin, Button, Icon, Drawer } from 'antd';
import { getKnowledgeGraphs, downloadKnowledgeGraph, deleteKnowledgeGraph } from '../api/KgApi';
import { saveFileInfo, dateFormat } from '../utils/utils';
import moment from 'moment'
import AddKnowledgeGraph from './AddKnowledgeGraph';

export default class LoadKnowledgeGraphs extends React.Component {
    _isMounted = false;
    state = {
        data: [],
        visible: false,
        drawer: null,
        loading: true
    }

    componentDidMount() {
        this._isMounted = true;
        this.requestKnowledgeGraphs()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    showDrawer = () => {
        this.setState({
            visible: true,
            drawer: <AddKnowledgeGraph onClose={this.onClose} />
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
            drawer: null
        });
        this.requestKnowledgeGraphs()
    };

    requestKnowledgeGraphs() {
        this._isMounted && this.setState({ loading: true })
        getKnowledgeGraphs(
            this.loaded)
    }

    loaded = (data) => {
        if (data === undefined)
            data = []
        this._isMounted && this.setState({
            data: data,
            loading: false
        });
    }

    render() {
        return (
            this.state.loading ? <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 36 }}>
                <Spin size='large' /></div> :

                <div>
                    <Drawer
                        title="Create a new knowledge graph"
                        width='35vw'
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    // style={{
                    //     overflow: 'auto'
                    // }}
                    >
                        {this.state.drawer}
                    </Drawer>
                    <div style={{ textAlign: 'center', padding: 6 }}>
                        <h1>Knowledge Graphs</h1>
                    </div>
                    <List
                        style={{ height: 'calc(100vh - 99px)', overflow: 'auto' }}
                        className='bigCards'
                        rowKey="mappingsView"
                        grid={this.props.drawer ? { column: 1 } : { gutter: 12, lg: 3, md: 2, sm: 1, xs: 1 }}
                        dataSource={['', ...this.state.data]}
                        renderItem={item =>
                            item ? (
                                <List.Item key={item.mappingID} style={{ paddingBottom: 6 }}>
                                    <Card hoverable actions={[
                                        <NavLink to={"/open/kg/info/" + item.mappingID}>
                                            <Popover content={
                                                <div>
                                                    <p>{item.kgTriples + " triples"}</p>
                                                </div>
                                            } placement="bottom">
                                                <span>
                                                    metrics
                                        </span>
                                            </Popover>
                                        </NavLink>,
                                        <span onClick={
                                            () => downloadKnowledgeGraph(
                                                item.kgIri,
                                                "RDF",
                                                saveFileInfo)
                                        }>
                                            download
                                    </span>,
                                        <span onClick={
                                            () => deleteKnowledgeGraph(
                                                item.kgIri,
                                                this.requestKnowledgeGraphs.bind(this))
                                        }>
                                            delete
                                    </span>
                                    ]}>
                                        <div onClick={() => this.props.open(item.kgIri)}>
                                            {this.props.drawer ?
                                                <div>
                                                    <Card.Meta key={item.kgIri}
                                                        title={item.kgTitle[0].content + ' ' + item.kgIri}
                                                        description={item.mappingDescription}
                                                    />
                                                    <div className='ant-card-meta-description'>{moment(item.kgLastModifiedTs).format(dateFormat)}</div>
                                                </div> :
                                                <NavLink to={"/open/kg/info"}>
                                                    <Card.Meta key={item.kgIri}
                                                        title={item.kgTitle[0].content + ' ' + item.kgIri}
                                                        description={item.mappingDescription}
                                                    />
                                                    <div className='ant-card-meta-description'>{moment(item.kgLastModifiedTs).format(dateFormat)}</div>
                                                </NavLink>
                                            }
                                        </div>
                                    </Card>
                                </List.Item>
                            ) : (
                                    <List.Item>
                                        <Button type='primary' style={{ height: 270, width: '100%' }} onClick={this.showDrawer}>
                                            <Icon type="plus" /> Add Knowledge Graph
                                        </Button>
                                    </List.Item>
                                )
                        }
                    />
                </div>
        );
    }
}