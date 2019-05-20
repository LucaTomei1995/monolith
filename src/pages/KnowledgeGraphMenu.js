import React from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd';

const MenuItem = Menu.Item;


export default class KnowledgeGraphMenu extends React.Component {
    state = {
        currMenu: ['info']
    }

    componentWillReceiveProps(props) {
        let currMenu = [props.select]
        this.setState({ currMenu: currMenu })
    }

    render() {
        return (
            <Menu
                selectedKeys={this.state.currMenu}
                style={{ background: 'transparent', padding: '0px 1px 0px 0px', height: 'calc(100vh - 47px)', overflow: 'auto' }}
                mode="inline">
                <MenuItem key="info" style={{ marginTop: 0 }}>
                    <Link to="/open/kg/info" >
                        <Icon type="info" />
                        <span>Info</span>
                    </Link>
                </MenuItem>
                <MenuItem key="import" style={{ marginTop: 0 }}>
                    <Link to="/open/kg/import" >
                        <Icon type="import" />
                        <span>Import</span>
                    </Link>
                </MenuItem>
                <MenuItem key="explore" style={{ marginTop: 0 }}>
                    <Link to="/open/kg/explore" >
                        <Icon type="search" />
                        <span>Explore</span>
                    </Link>
                </MenuItem>
                <MenuItem key="endpoint">
                    <Link to="/open/kg/endpoint">
                        <Icon type="database" />
                        <span>Endpoint</span>
                    </Link>
                </MenuItem>
            </Menu>
        )
    }
}
