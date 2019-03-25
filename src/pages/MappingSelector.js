import React from 'react';
import { Select, Popover, Button, } from 'antd';
import { startMastro, stopMastro, getMastroStatus } from '../api/MastroApi';

const Option = Select.Option;

export default class MappingSelector extends React.Component {
    state = {
        enabledStart: true,
        loading: false,
        interval: 0,
    }

    componentWillUnmount() {
        this.stopPolling()
    }

    getOptions(item) {
        return <Option value={item.mappingID} key={item.mappingID}>
            <Popover content={
                <div>
                    <p>{item.mappingID}</p>
                    <small>{item.mappingDescription}</small>
                </div>
            } placement='right'>
                <div className='mapping'>
                    {item.mappingID}
                </div>
            </Popover>
        </Option>
    }

    disableStart(e) {
        this.setState({ enabledStart: !e.target.checked })
    }

    start() {
        if (this.state.enabledStart) {
            startMastro(this.props.ontology.name, this.props.ontology.version, this.props.selected, this.startPolling.bind(this))
            this.setState({ loading: true })
        }
        else {
            stopMastro(this.props.ontology.name, this.props.ontology.version, this.props.selected, () => {
                this.setState({ enabledStart: true })
            })
        }
    }

    stop() {
        this.stopPolling()
    }

    polling() {
        getMastroStatus(this.props.ontology.name, this.props.ontology.version, this.props.selected, this.checkStatus.bind(this))
    }

    startPolling() {
        this.setState({ interval: setInterval(this.polling.bind(this), 1000) })
    }

    stopPolling() {
        clearInterval(this.state.interval)
        this.setState({ loading: false })
    }

    checkStatus(status) {
        if (status.status === 'ERROR') {
            this.stopPolling()
        }

        if (status.status === 'RUNNING') {
            this.setState({ enabledStart: false })
            this.stopPolling()
        }
    }

    render() {
        if (this.props.mappings[0] === undefined) return null
        const mappings = this.props.mappings.map(item => this.getOptions(item));
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                    <Popover content={(this.state.enabledStart ? 'Start' : 'Stop')+' Mastro Reasoner'} placement='left'>
                        <Button
                            style={{ margin: 1 }}
                            shape='circle'
                            ghost
                            icon={this.state.enabledStart ? 'medium' : 'stop'}
                            loading={this.state.loading}
                            onClick={this.start.bind(this)}
                        />
                    </Popover>
                    <Select
                        style={{ paddingLeft: 4 }}
                        defaultValue={
                            this.props.mappings[0].mappingID
                        }
                        onChange={this.props.onSelection}
                        disabled={this.state.loading || !this.state.enabledStart}>
                        {mappings}
                    </Select>
                </div>
                {/* <Checkbox style={{}} onChange={this.disableStart.bind(this)}>autostart</Checkbox> */}
            </div>


        )
    }
}
