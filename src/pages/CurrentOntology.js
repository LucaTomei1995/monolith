import React from 'react';
import { Route } from 'react-router-dom'
import { Layout, Icon } from 'antd';
import OntologyMenu from './OntologyMenu'
import OntologyInfo from './OntologyInfo';
import OntologyWiki from './OntologyWiki';
import LoadMappings from './LoadMappings';
import SPARQLEndpoint from './SPARQLEndpoint';
import CurrentMapping from './CurrentMapping';
import Graphol from './Grapholscape';
import UnderConstruction from './UnderConstruction';

const { Content, Sider } = Layout;
export default class CurrentOntology extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
            <Layout style={{ margin: '-1vh -1vw', height: 'calc(100vh - 25px)'}}>
                <Sider
                    // width={200} 
                    className='ontologyMenu'
                    collapsed={this.state.collapsed}
                >
                    <OntologyMenu select={this.props.match.params.menu}/>
                    <div>
                        <Icon
                            style={{ display: "inherit", cursor: "pointer", color: 'white', padding: 4 }}
                            theme="filled"
                            type={this.state.collapsed ? 'caret-right' : 'caret-left'}
                            onClick={this.toggle}
                        />
                    </div>

                </Sider>
                <Layout style={{ paddingLeft: '1vw', }}>
                    <Content >
                        <div >

                            <Route path="/open/ontology/info" render={(props) => 
                                <OntologyInfo {...props} ontology={this.props.ontology}/>} />
                            <Route path="/open/ontology/wiki/:predicateType?/:entityID?" render={(props) => 
                                <OntologyWiki {...props} ontology={this.props.ontology}/>} />
                            <Route path="/open/ontology/graphol" render={(props) => 
                                <Graphol {...props} ontology={this.props.ontology}/>} />
                            <Route path="/open/ontology/mappings" render={(props) => 
                                <LoadMappings {...props} ontology={this.props.ontology}/>} />
                            <Route path="/open/ontology/mapping/:tab/:mappingID" render={(props) => 
                                <CurrentMapping {...props} ontology={this.props.ontology}/>} />
                            <Route path="/open/ontology/endpoint/:queryID?" render={(props) => 
                                <SPARQLEndpoint {...props} ontology={this.props.ontology}/>} />
                            <Route path="/open/ontology/dataQuality" component={() => <UnderConstruction />} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
