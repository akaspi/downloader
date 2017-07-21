import React from 'react';
import PropTypes from 'prop-types';
import { download } from '../utils/downloadUtils';

function getDownloadPercent(total, chunk) {
    if (total === 0) {
        return total;
    }
    return Math.floor(chunk / total * 100)
}

export default class DownloadItem extends React.Component {
    constructor() {
        super();

        this.state = {
            fileSize: 0,
            chunk: 0
        };
    }

    setFileSize = ({ fileSize }) => {
        this.setState({ fileSize });
    };

    updateDownloadChunk = ({ chunk }) => {
        this.setState({ chunk: this.state.chunk + chunk });
    };

    componentDidMount() {
        download(this.props.url, this.setFileSize, this.updateDownloadChunk, () => {
            console.log('END');
        })
    }

    render() {
        return (
            <span>{`${getDownloadPercent(this.state.fileSize, this.state.chunk)}%`}</span>
        );
    }
};

DownloadItem.propTypes = {
    url: PropTypes.string.isRequired
};