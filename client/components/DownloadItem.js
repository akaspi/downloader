import React from 'react';
import PropTypes from 'prop-types';

function getDownloadPercent(total, chunk) {
    if (total === 0) {
        return total;
    }
    return Math.floor(chunk / total * 100)
}

export default class DownloadItem extends React.Component {
    componentDidMount() {
        this.props.download(this.props.url);
    }

    render() {
        const percent = getDownloadPercent(this.props.fileSize, this.props.chunk);
        return (
            <div>
                <h4>{`Downloading: ${this.props.url} - ${percent}%`}</h4>
            </div>
        );
    }
};

DownloadItem.propTypes = {
    url: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired,
    chunk: PropTypes.number.isRequired,
    download: PropTypes.func.isRequired
};