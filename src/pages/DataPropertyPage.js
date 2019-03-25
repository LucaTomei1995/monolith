import React from 'react'
import { Card, Popover, List } from 'antd';
import { getDataPropertyPage } from '../api/MastroApi';

import { renderEntity, predicateTypes } from '../utils/utils'
import ListItem from './ListItem';

export default class DataPropertyPage extends React.Component {
    _isMounted = false;
    state = {
        data: {}
    }

    componentDidMount() {
        this._isMounted = true;
        // console.log(this.props)
        if (this.props.match.params.entityID !== undefined)
            getDataPropertyPage(
                this.props.ontology.name,
                this.props.ontology.version,
                this.props.match.params.entityID,
                this.loaded)
    }

    componentWillReceiveProps(props) {
        // console.log(props)
        if (props.match.params.entityID !== undefined)
            getDataPropertyPage(
                props.ontology.name,
                props.ontology.version,
                props.match.params.entityID,
                this.loaded)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    loaded = (data) => {
        this._isMounted && this.setState({ data: data })
    }

    render() {
        // console.log("OBJECT PROPERTY PAGE", this.props)
        if (this.state.data.currentEntity === undefined) return null

        let dataPropertyCharacteristics = []

        this.state.data.dataPropertyFunctional && dataPropertyCharacteristics.push("Functional")

        const components = [

            <Card className='dataPropertyCard' title="Equivalent Data Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.equivalentDataProperties} />
            </Card>,
            <Card className='dataPropertyCard' title="Sub Data Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.subDataProperties} />
            </Card>,
            <Card className='dataPropertyCard' title="Super Data Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.superDataProperties} />
            </Card>,
            <Card className='dataPropertyCard' title="Disjoint Data Properties" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.disjointDataProperties} />
            </Card>,
            <Card className='dataPropertyCard' title="Domain" >
                <ListItem entity predicateType={predicateTypes.c} data={this.state.data.dataPropertyDomain} />
            </Card>,
            <Card className='dataPropertyCard' title="Range" >
                <ListItem entity predicateType={predicateTypes.c} data={this.state.data.dataPropertyRange} />
            </Card>,
            <Card className='dataPropertyCard' title="Data Property Characteristics" >
                <ListItem data={dataPropertyCharacteristics} />
            </Card>,
            <Card className='dataPropertyCard' title="Data Property Individuals" >
                <ListItem entity predicateType={predicateTypes.op} data={this.state.data.dataPropertyIndividuals} />
            </Card>,
        ]
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1 >{renderEntity(this.state.data.currentEntity)}</h1>
                    <Popover content={this.state.data.currentEntity.entityIRI}>
                        <h3>{this.state.data.currentEntity.entityPrefixIRI}</h3>
                    </Popover>
                </div>
                <div style={{ padding: '0px' }}>
                    <Card title="Description" data={this.state.data.dataPropertyDescriptions} className='description'/>
                </div>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={components}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
            </div>

        );
    }
}

