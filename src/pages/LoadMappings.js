import React from 'react'
import { NavLink } from 'react-router-dom'
import { List, Card, Divider, Popover } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis'
import UploadFile from './UploadFile';
import { getMappings, deleteMappingFile } from '../api/MastroApi';



class LoadMappings extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        this.requestMappings()
    }

    requestMappings() {
        getMappings(
            this.props.ontology.name,
            this.props.ontology.version,
            this.loaded)
    }

    loaded = (data) => {
        if (data === undefined)
            data = []
        this.setState((state) => ({
            data: data.mappingList
        }));
    }

    render() {
        return (
            <div style={{ padding: 2 }}>
                <Divider>Choose or add a mapping</Divider>
                <List
                    rowKey="mappingsView"
                    grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                    dataSource={[...this.state.data, '']}
                    renderItem={item =>
                        item ? (
                            <List.Item key={item.mappingID}>
                                <Card hoverable actions={[
                                    <Popover content={
                                        <div>
                                            <p>{item.numAssertions + " assertions"}</p>
                                            <p>{item.numViews + " views"}</p>
                                            <p>{item.numKeyDependencies + item.numInclusionDependencies + item.numDenials + " dependencies"}</p>
                                        </div>
                                    } placement="bottom">
                                        <span>
                                            info
                                        </span>
                                    </Popover>,
                                    <span onClick={
                                        () => deleteMappingFile(this.props.ontology.name, this.props.ontology.version, item.mappingID, this.requestMappings.bind(this))
                                    }>
                                        delete
                                    </span>
                                ]}>
                                    <NavLink to={"/open/ontology/mapping/info/" + item.mappingID}>
                                        <Card.Meta key={item.mappingID}
                                            avatar={<img alt="" src={item.avatar} />}
                                            title={item.mappingID}
                                            description={
                                                <Ellipsis>
                                                    {item.mappingDescription}
                                                </Ellipsis>
                                            }
                                        /> </NavLink>
                                </Card>
                            </List.Item>
                        ) : (
                                <List.Item>
                                    <UploadFile type='mapping' current={this.props.ontology} rerender={this.requestMappings.bind(this)} />
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

export default LoadMappings;