import React from 'react'
import { Link } from 'react-router-dom'
import { getSubjectType } from '../api/KgApi';
import { Spin } from 'antd';

export default class InstanceNavigationSubjectType extends React.Component {
    state = {
        data: {},
        loading: true,
        page: 0
    }

    componentDidMount() {
        // this.props.predicate
        // this.props.type
        getSubjectType(this.props.kg.kgIri, this.props.resource, this.props.predicate, this.props.type, this.state.page, this.loaded)
    }

    loaded = (data) => {
        this.setState({ data, loading: false })
    }

    nextPage = () => {
        const nextPageNumber = this.state.page + 1
        getSubjectType(
            this.props.kg.kgIri,
            this.props.resource,
            this.props.predicate,
            this.props.type,
            nextPageNumber,
            this.loaded)
        this.setState({ page: nextPageNumber })
    }

    previousPage = () => {
        const prevPageNumber = this.state.page - 1
        getSubjectType(
            this.props.kg.kgIri,
            this.props.resource,
            this.props.predicate,
            this.props.type,
            prevPageNumber,
            this.loaded)
        this.setState({ page: prevPageNumber })
    }

    render() {
        if (this.state.loading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 36 }}> <Spin size='large' /></div>
        const obj = this.state.data
        const pages = this.props.pages

        var values = [];
        for (var j = 0; j < obj.subject_object_properties[0].objects.length; j++) {
            var iri = obj.subject_object_properties[0].objects[j].object_resource;//.replace(iriSie,local);
            var label = obj.subject_object_properties[0].objects[j].object_label;

            values.push(
                <li key={j}>
                    <Link to={'?iri=' + encodeURIComponent(iri)}>
                        {this.props.renderShortIRI(obj.subject_object_properties[0].objects[j].object_resource_short)}
                    </Link>
                    {label && <div>
                        <font>&#8618; </font>
                        <small>{label}</small>
                    </div>}
                </li>
            )
        }

        return (
            <div>

                <ul>
                    {values}
                </ul>
                {pages > 1 && <div style={{ float: 'right' }}>
                    {this.state.page !== 0 && <button className="ant-btn" onClick={this.previousPage}>&lt;</button>}
                    {pages > this.state.page + 1 && <button className="ant-btn" onClick={this.nextPage}>&gt;</button>}
                    <br /><small style={{ float: 'right' }}>{this.state.page + 1} of {pages}</small>
                </div>}
            </div>
        )
    }
}