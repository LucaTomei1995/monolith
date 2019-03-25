import React from 'react'
import { Card } from 'antd';
import QueryInfo from './QueryInfo'
import OntologyRewritings from './OntologyRewritings';
import MappingRewritings from './MappingRewritings';
import ViewRewritings from './ViewRewritings';

export default class QueryExecutionReport extends React.Component {
    state = {
        tabKey: 'qi',
    }

    onTabChange = (key, type) => {
        // console.log(key, type);
        this.setState({ [type]: key });
    }

    render() {

        const tabList = [
            { key: "qi", tab: "Query Info" },
            { key: "or", tab: "Ontology Rewritings" },
            { key: "mr", tab: "Mapping Rewritings" },
            { key: "vr", tab: "View Rewritings" },
        ];

        const contentList = {
            qi: <QueryInfo status={this.props.status} />,
            or: <OntologyRewritings
                ontology={this.props.ontology}
                mappingID={this.props.mappingID}
                executionID={this.props.executionID}
                running={this.props.running} />,
            mr: <MappingRewritings
                ontology={this.props.ontology}
                mappingID={this.props.mappingID}
                executionID={this.props.executionID}
                running={this.props.running}
            />,
            vr: <ViewRewritings
                ontology={this.props.ontology}
                mappingID={this.props.mappingID}
                executionID={this.props.executionID}
                running={this.props.running}
            />,
        }

        return (
            <div>
                <Card
                    className='queryExecutionReport'
                    style={{ width: '100%' }}
                    tabList={tabList}
                    activeTabKey={this.state.tabKey}
                    onTabChange={(key) => { this.onTabChange(key, 'tabKey'); }}
                >
                    {contentList[this.state.tabKey]}
                </Card>
            </div>
        );
    }
}
