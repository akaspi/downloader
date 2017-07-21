import React from 'react';
import DownloadItem from './DownloadItem';

export default class Root extends React.Component {
    constructor() {
        super();
        this.state = {
            downloadQueue: []
        };
    }

    handleClick = () => {
        const fileUrl = this.refs.fileInput.value;
        this.setState({
            downloadQueue: this.state.downloadQueue.concat([ fileUrl ])
        });
    };

    render() {
        if (this.state.downloadQueue.length === 0) {
            return (
                <div>
                    <input placeholder='type file url...' ref='fileInput' />
                    <button onClick={this.handleClick}>Download!</button>
                    <div>Nothing to download...</div>
                </div>
            )
        }

        const currentDownload = this.state.downloadQueue[this.state.downloadQueue.length - 1];
        return (
            <div>
                <input placeholder='type file url...' ref='fileInput' />
                <button onClick={this.handleClick}>Download!</button>
                <DownloadItem url={currentDownload}/>
            </div>
        )
    }
}