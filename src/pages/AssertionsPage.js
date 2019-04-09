import React from 'react';
import { Popover, Spin } from 'antd';
import AssertionsList from './AssertionsList';
import { getMappingAssertion } from '../api/MastroApi';
import Entity from "./Entity";


export default class AssertionsPage extends React.Component {
    _isMounted = false;
    state = {
        data: null,
        loading: false
    }

    componentDidMount() {
        this._isMounted = true;
        // console.log(this.props)
        if (this.props.current !== undefined) {
            this.setState({ loading: true })
            getMappingAssertion(
                this.props.ontology.name,
                this.props.ontology.version,
                this.props.mappingID,
                this.props.current,
                this.loaded)
        }
    }

    componentWillReceiveProps(props) {
        // console.log(props)
        if (props.current !== undefined) {
            this.setState({ loading: true })
            getMappingAssertion(
                props.ontology.name,
                props.ontology.version,
                props.mappingID,
                props.current,
                this.loaded)
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    loaded = (data) => {
        // console.log(data)
        this._isMounted && this.setState({ data: data, loading: false })
    }

    render() {
        // console.log(this.state.data)
        if(this.state.data === null || this.state.loading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 36 }}> <Spin size='large' /></div>
        
        return (
            <div>
                <div style={{ textAlign: 'center', padding: '16px 0px 16px 0px' }}>
                    <h1>Mapping for <Entity entity={this.state.data[0].currentEntity} predicateType={this.state.data[0].currentEntity.entityType} /></h1>
                    <Popover content={this.state.data[0].currentEntity.entityIRI} placement='bottom'>
                        <h3>{this.state.data[0].currentEntity.entityPrefixIRI}</h3>
                    </Popover>
                </div>


                <AssertionsList list={this.state.data} />
            </div>
        );
    }
}
