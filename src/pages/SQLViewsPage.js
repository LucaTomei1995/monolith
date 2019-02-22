import React from 'react';
import { Card, List, } from 'antd'
import AssertionsList from './AssertionsList';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';
import sqlFormatter from 'sql-formatter'
import Dependencies from './Dependencies'
import { getMappingView } from '../api/MastroApi';



class SQLViewsPage extends React.Component {

    state = {
        data: null
    }

    componentDidMount() {
        getMappingView(
            this.props.ontology.name,
            this.props.ontology.version,
            this.props.mappingID,
            this.props.viewID,
            this.loaded)
    }

    loaded = (data) => {
        this.setState({ data: data })
    }

    render() {
        const data = this.state.data
        if (data === null) return null
        const elements = [
            <Card title="Code">
                <SyntaxHighlighter language='sql' style={docco}>
                    {sqlFormatter.format(data.sqlView.sqlViewCode)}
                </SyntaxHighlighter>
            </Card>,
            <AssertionsList entity list={data.mappingAssertions} />,
            <Dependencies dependencies={data.mappingDependencies} />

        ]
        return (
            <div style={{ paddingTop: 12 }}>
                <div style={{ textAlign: 'center', padding: 16 }}>
                    <h1 >{data.sqlView.sqlViewID}</h1>
                    <p>{data.sqlView.sqlViewDescription}</p>
                </div>
                <List
                    grid={{ gutter: 12, column: 1 }}
                    dataSource={elements}
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

export default SQLViewsPage;