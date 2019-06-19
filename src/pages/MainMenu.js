import React from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd';

const MenuItem = Menu.Item;

export default class MainMenu extends React.Component {

    render() {

        const mastroUrl = localStorage.getItem('mastroUrl')
        const helpUrl = mastroUrl ? mastroUrl.substring(0, mastroUrl.length - 9) + "HelpPage" : '/'

        return (
            <div>
                <Menu
                    theme="dark"
                    className='mainMenu'
                    mode="vertical">
                    <MenuItem key="ontology">
                            <NavLink
                                to="/ontology"
                                activeStyle={{ fontWeight: "bold" }}
                                style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                            >
                                <span>
                                    <Icon type="block" />
                                    <span>Ontology</span>
                                </span>
                            </NavLink>
                    </MenuItem>

                    <MenuItem key="kg">
                            <NavLink
                                to="/kg"
                                activeStyle={{ fontWeight: "bold" }}
                                style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                            >
                                <span><Icon type="deployment-unit" /><span>Knowledge Graph</span></span>
                            </NavLink>
                    </MenuItem>
                    <MenuItem key="dataset">
                            <NavLink
                                to="/dataset"
                                activeStyle={{ fontWeight: "bold" }}
                                style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                            >
                                <span><Icon type="table" /><span>Dataset</span></span>
                            </NavLink>
                    </MenuItem>

                    <MenuItem
                        style={{ marginTop: 'auto' }}
                        key="admin">
                        <NavLink to="/admin">
                            <Icon type="user" />
                            <span>Administration</span>
                        </NavLink>
                    </MenuItem>

                    <MenuItem key="sett">
                        <NavLink
                            to="/settings"
                            activeStyle={{ fontWeight: "bold", color: "white" }}
                            style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                        >
                            <Icon type="setting" />
                            <span>Settings</span>
                        </NavLink>
                    </MenuItem>
                    <MenuItem key="help">
                        <a href={helpUrl} target="_blank" rel="noopener noreferrer">
                            <Icon type="question-circle" />
                            <span>Help</span>
                        </a>
                    </MenuItem>
                    <MenuItem key="Logout">
                        <div
                            style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                            onClick={this.props.logout}
                        >
                            <Icon type="logout" />
                            <span>
                                <span>Logout </span>
                                <span style={{ fontWeight: 'bold' }}>{localStorage.getItem('username')}</span>
                            </span>
                        </div>
                    </MenuItem>
                </Menu>
            </div>

        )
    }
}
