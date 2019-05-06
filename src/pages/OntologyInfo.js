import React from 'react';
import { List, Card, Spin } from 'antd';
import OntologyMetricsTabs from './OntologyMetricsTabs'
import DownloadFile from './DownloadFile'
import { getOntologyVersionInfo } from '../api/MastroApi';
import ListItem from './ListItem';

export default class OntologyInfo extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = { data: {}, loading: false }
    }

    componentDidMount() {
        //console.log(props.ontology.name + "    " + props.ontology.version)
        this._isMounted = true;
        this.setState({ loading: true })
        getOntologyVersionInfo(
            this.props.ontology.name,
            this.props.ontology.version,
            this.loaded)
    }

    componentWillReceiveProps(props) {
        //console.log(props.ontology.name + "    " + props.ontology.version)
        this.setState({ loading: true })
        getOntologyVersionInfo(
            props.ontology.name,
            props.ontology.version,
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
        let metriscAxioms = {}

        if (this.state.data.ontologyMetrics !== undefined) {
            let axioms = []
            axioms.push(...this.state.data.ontologyMetrics.classAxioms)
            axioms.push(...this.state.data.ontologyMetrics.objectPropertyAxioms)
            axioms.push(...this.state.data.ontologyMetrics.dataPropertyAxioms)
            axioms.push(...this.state.data.ontologyMetrics.individualAxioms)
            axioms.push(...this.state.data.ontologyMetrics.annotationAxioms)

            metriscAxioms = {
                metrics: this.state.data.ontologyMetrics.metrics,
                axioms: axioms
            }
        }

        let prefixes = []
        this.state.data.prefixes && this.state.data.prefixes.forEach(element => {
            prefixes.push({mapKey: element.name, mapValue: element.namespace})
        });

        const elements = [
            <OntologyMetricsTabs titles={[
                { key: "pm", tab: "Prefixes" }, { key: "imports", tab: "Imports" },
            ]}
                data={{ imports: this.state.data.ontologyImports, pm: prefixes}} />,
            <OntologyMetricsTabs titles={[
                { key: "metrics", tab: "Metrics" },
                { key: "axioms", tab: "Axioms" },
            ]}
                data={metriscAxioms} />,

        ]

        return (
            this.state.loading ? <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 36 }}> <Spin size='large' /></div> :

                <div style={{ paddingRight: '1vw', paddingBottom: '1vh' }} >
                    <div style={{ textAlign: 'center', padding: 16 }}>
                        <h1 >{this.props.ontology.name}</h1>
                    </div>
                    <h3>{`Ontology IRI: ${this.state.data.ontologyIRI}`}</h3>
                    <h3>{`Ontology Version IRI: ${this.props.ontology.version}`}</h3>
                    <div style={{ paddingBottom: 12 }}>
                        {/* <OntologyMetricsTabs titles={[{ key: "desc", tab: "Descriptions" }]} data={this.state.data.ontologyDescriptions} /> */}
                        <Card title='Description' className='description'>
                            <ListItem label data={this.state.data.ontologyDescriptions} />
                        </Card>
                    </div>
                    <List
                        grid={{ gutter: 12, column: 2 }}
                        dataSource={elements}
                        renderItem={item => (
                            <List.Item>
                                {item}
                            </List.Item>
                        )}
                    />

                    <div style={{ display: 'flex', paddingTop: 12 }}>
                        <DownloadFile ontology={this.props.ontology}
                        />
                    </div>
                </div>
        );
    }
}