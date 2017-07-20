import React from 'react';
import { ipcRenderer } from 'electron';

function getDownloadPercent(total, downloaded) {
    if (total === 0) {
        return total;
    }
    return Math.floor(downloaded / total * 100)
}

export default class Root extends React.Component {
    constructor() {
        super();
        this.state = {
            total: 0,
            downloaded: 0
        };
    }

    handleClick = () => {
        ipcRenderer.send('download-file', {
            fileUrl: this.refs.fileInput.value
        });

        ipcRenderer.on('download-start', (event, props) => {
            this.setState({
                total: props.total
            });
        });

        ipcRenderer.on('download-on', (event, props) => {
            this.setState({
                downloaded: this.state.downloaded + props.chunk
            });
        });

        ipcRenderer.on('download-end', () => {
            ipcRenderer.removeAllListeners();
        });
    };

    render() {
        return (
            <div>
                <input placeholder='type file url...' ref='fileInput' />
                <button onClick={this.handleClick}>Download!</button>
                <span id="progress">{`${getDownloadPercent(this.state.total, this.state.downloaded)}%`}</span>
            </div>
        )
    }
}