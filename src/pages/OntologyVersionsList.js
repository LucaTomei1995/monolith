import React from 'react';
import { NavLink } from 'react-router-dom'
import { List, Card, Popover, Select, Button, Modal } from 'antd';
import UploadFile from './UploadFile';
import { downloadOntologyFile, deleteOntologyVersion } from '../api/MastroApi';
import { saveFileInfo, dateFormat } from '../utils/utils';
import moment from 'moment'


const Option = Select.Option
export default class OntologyVersionsList extends React.Component {
    state = {
        data: []
    }

    getData(props) {
        var list = [];
        for (let i = 0; i < this.props.data.length; i++) {
            if (this.props.data[i].ontologyID === this.props.current) {
                list = [...this.props.data[i].ontologyVersions];
                break;
            }
        }
        return list;
    }

    sortByDate(a, b) {
        var x = a.versionDate;
        var y = b.versionDate;
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
    }

    sortByDateD(a, b) {
        var x = a.versionDate;
        var y = b.versionDate;
        if (x > y) { return -1; }
        if (x < y) { return 1; }
        return 0;
    }

    sortByName(a, b) {
        var x = a.versionID.toLowerCase();
        var y = b.versionID.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
    }

    componentDidMount() {
        this.setState({
            data: this.getData(this.props.data).sort(this.sortByDate)
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: this.getData(props.data).sort(this.sortByDate)
        })
    }


    delete(ontologyID, versionID) {
        deleteOntologyVersion(ontologyID, versionID, this.props.rerender)
        this.props.close({
            name: ontologyID,
            version: versionID
        })
    }

    changeSort = (value) => {
        if (value === 'name')
            this.setState({
                data: this.getData(this.props.data).sort(this.sortByName)
            })
        else if (value === 'date')
            this.setState({
                data: this.getData(this.props.data).sort(this.sortByDate)
            })
        else if (value === 'dateD')
            this.setState({
                data: this.getData(this.props.data).sort(this.sortByDateD)
            })
    }

    render() {

        return (
            <div>
                <Modal
                    visible={this.state.modalVisible}
                    onOk={() => this.delete(this.state.toDelete.name, this.state.toDelete.version)}
                    onCancel={() => this.setState({ modalVisible: false, toDelete: null })}
                >
                    Delete ontology version?
                </Modal>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 6 }}>
                    <Button style={{ width: 140 }} type='primary' icon='step-backward' onClick={this.props.prev}>
                        Back
                    </Button>
                    <h1>Ontology Versions</h1>
                    <Select style={{ width: 205 }} defaultValue='date' onChange={this.changeSort}>
                        <Option value='date' >
                            Sort by date (ascending)
                        </Option>
                        <Option value='dateD' >
                            Sort by date (descending)
                        </Option>
                        <Option value='name' >
                            Sort by version
                    </Option>
                    </Select>
                </div>
                <List
                    style={{ height: 'calc(100vh - 79px)', overflow: 'auto' }}
                    className='bigCards'
                    rowKey="ontologyVersionsView"
                    grid={{ gutter: 12, lg: 3, md: 2, sm: 1, xs: 1 }}
                    dataSource={['', ...this.state.data]}
                    renderItem={item =>
                        item ? (
                            <List.Item key={item.versionID}>
                                <Card hoverable actions={[
                                    <Popover content={
                                        <div>
                                            <p>{item.numClasses + " classes"}</p>
                                            <p>{item.numObjectProperties + " object properties"}</p>
                                            <p>{item.numDataProperties + " data properties"}</p>
                                            <p>{item.numAxioms + " axioms"}</p>
                                        </div>
                                    } placement="bottom">
                                        <span>
                                            info
                                        </span>
                                    </Popover>,
                                    <span onClick={
                                        () => downloadOntologyFile(item.ontologyID, item.versionID, saveFileInfo)
                                    }>
                                        download
                                    </span>,
                                    <span onClick={
                                        () => this.setState({ modalVisible: true, toDelete: { name: item.ontologyID, version: item.versionID } })
                                    }>
                                        delete
                                    </span>
                                ]}>
                                    <NavLink to={"/open/ontology/info/"} onClick={() => this.props.open(item.ontologyID, item.versionID)}>
                                        <Card.Meta key={item.versionID}
                                            avatar={<img alt="" src={item.avatar} />}
                                            title={
                                                <div>
                                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {item.ontologyID}
                                                    </div>
                                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', direction: 'rtl', textAlign: 'left' }}>
                                                        {'Version: ' + item.versionID}
                                                    </div>
                                                </div>
                                            }
                                            description={item.versionDescription[0] !== undefined ? item.versionDescription[0].content : ""}
                                        />
                                    </NavLink>
                                    <div className='ant-card-meta-description'>{moment(item.versionDate).format(dateFormat)}</div>
                                </Card>
                            </List.Item>
                        ) : (
                                <List.Item>
                                    <UploadFile current={this.props.current} rerender={this.props.rerender} type='owl' />
                                    {/* <Button type="dashed" onClick={() => console.log("Add version of ontology")}>
                                        <Icon type="plus" />
                                        Add Ontology Version
                                    </Button> */}
                                </List.Item>
                            )
                    }
                />
            </div>
        );
    }
}
