import React from 'react';
import { Table , Form, Button, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { postMappingViews, putMappingView, postSQLEx, getTableResult } from '../api/MastroApi';
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql'; 
import fromTextArea from'codemirror/src/edit/fromTextArea';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';


class Mine extends React.Component {
    componentDidMount() {
        document.getElementsByName("textarea")[0].setAttribute("id", "textarea");
        if (this.props.sqlView) {
            const values = this.props.sqlView
            this.props.form.setFieldsValue({
                name: values.sqlViewID,
                description: values.sqlViewDescription,
                code: values.sqlViewCode
            })
            getTableResult(this.props.ontology.version, this.props.mappingID, this.props.ontology.name, this.getAutoComplete);
            var CodeMirror = codemirror.fromTextArea(document.getElementById("textarea") , {
                mode: 'sql',
                lineNumbers: true,
                extraKeys: {
                    "Ctrl-Space": "autocomplete"
                },
                hintOptions: {
                    tables:[
                        {text: "const" , displayText: "const diomaiale"},
                    ]
                    ,
                }
            });
            var mirrorvalue = this.props.sqlView.sqlViewCode ? this.props.sqlView.sqlViewCode : '';
            CodeMirror.setValue(mirrorvalue);
            }

    }

    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            testSqlQuery: this.props.sqlView.code,
            renderTestSqlQuery: '',
            render: true,
            dataSource: [], 
            columns: [],
            tables: []
        };
      }


    autocompleteConstructor = () =>{
        var tab = this.state.tables;
        var numElements = tab['tables'].length;
        var result = [];

        for(var i = 0; i < numElements; i++){
            var tableName = tab['tables'][i]['name'];
            var listAttributes = tab['tables'][i]['attributes'];
            var numAttributesInTable = listAttributes.length;
            result.push({ name: tableName, type:"Tabella"});    // name:nometabella, 
            
            for(var j = 0; j < numAttributesInTable; j++){
                result.push({ name: listAttributes[j],  type:"(Attributo di " + tableName + ")"});  // name:nometabella, 
            }
        }

        return result;
    }
    
    getAutoComplete = (dbResult) =>{
        this.setState({tables: dbResult});
    }

    
    test = (queryResult) =>{
        this.setState({dataSource: []})  // Nuova tabella
        this.setState({columns: []})  // Nuova tabella
        var tmp = queryResult.split("\n");
        var numResults = tmp.length;
        var numAttributi = function(queryResultSplitted){
            var res = 0;
            var tmp = queryResultSplitted[0];
            for(var i = 0; i < tmp.length; i++){    if(tmp[i].includes('|'))    res += 1;}
            return res;
        }
        var qualiAttributi = function(queryResultSplitted){return queryResultSplitted[0].split('|');};
        
        var dataSource = [];
        var limitResult = numResults //>= 10 ? 10: numResults;

        if(numAttributi(tmp) != 0){
            for(var i = 0; i < numAttributi(tmp); i++){
                this.state.columns[i] = {title: qualiAttributi(tmp)[i], dataIndex: qualiAttributi(tmp)[i]}
            }
            for(var i = 0; i < numResults; i++){
                dataSource[i] = {key: i}
                if(i >=1){
                    for(var j = 0; j < numAttributi(tmp); j++)  dataSource[i][qualiAttributi(tmp)[j]] = tmp[i].split('|')[j]
                }
            }
        }else{
            message.error("Error on query Result");
        }
        this.setState({dataSource: dataSource})  // Nuova tabella
        this.setState({ showing: true});

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const sqlView = {
                    sqlViewID: values.name,
                    sqlViewDescription: values.description,
                    sqlViewCode: values.code
                }
                if (this.props.sqlView.sqlViewID)
                    putMappingView(
                        this.props.ontology.name,
                        this.props.ontology.version,
                        this.props.mappingID,
                        this.props.sqlView.sqlViewID,
                        sqlView,
                        this.props.success);
                else
                    postMappingViews(
                        this.props.ontology.name,
                        this.props.ontology.version,
                        this.props.mappingID,
                        sqlView,
                        this.props.success);
            }
        })
    }

    handleClick = (e) => {
        // this.state.textVal = CodeMirror.getValue();
        postSQLEx(
                document.querySelector('.CodeMirror').CodeMirror.getValue(),//this.state.textVal,
                this.props.ontology.version,
                this.props.mappingID,
                this.props.ontology.name,
                this.test)
        
        this.props.form.validateFieldsAndScroll((err , values) => {
            if(!err && this.state.render){
                this.setState({ render: false});
                this.setState({ renderTestSqlQuery: this.state.testSqlQuery});
            }
        })
    }



    render() {
        const {showing} = this.state;
        
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        
        const Item = ({ entity: { name, type } }) => <div>{`${name}: ${type}`}</div>;
        return (

            <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ maxWidth: 800 }}>
                <Form.Item label='Name'>
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: 'Please select sql view name',
                        }],
                    })(
                        <TextArea autosize={{ minRows: 1 }} />
                    )}
                </Form.Item>
                <Form.Item label='SQL Code'>
                    {getFieldDecorator('code', {
                        rules: [{
                            required: true, message: 'Please select sql view name',
                        }],
                    })(
                        <TextArea name = "textarea" autosize={{ minRows: 8 }} />
                    )}
                </Form.Item>
                <Form.Item label='Description'>
                    {getFieldDecorator('description', {
                        rules: [{
                            required: false,
                        }],
                    })(
                        <TextArea autosize={{ minRows: 1 }} />
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout} style={{ marginTop: 24 }}>
                    <Button type="primary" htmlType="submit">Save</Button>
                    &nbsp;
                    <Button type="secondary" htmlType="button" onClick={this.handleClick}>Test Query</Button>
                </Form.Item>
                {showing
                ? <div> 
                    <Table dataSource={this.state.dataSource} columns={this.state.columns} />;
                </div> 
                : null
                }
            </Form>
        )
    }
}
const WrappedSQLViewForm = Form.create({ name: 'visit' })(Mine /*AddSQLViewForm*/);

export default WrappedSQLViewForm