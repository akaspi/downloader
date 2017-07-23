import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

function getDownloadPercent(total, chunk) {
    if (total === 0) {
        return total;
    }
    return Math.floor(chunk / total * 100)
}

class DownloadItem extends React.Component {
    render() {
        const { fileSize, chunk } = this.props.store.getDownloadStatus(this.props.url);
        const percent = getDownloadPercent(fileSize, chunk);
        return (
            <div>
                <h4>{`Downloading: ${this.props.url} - ${percent}%`}</h4>
            </div>
        );
    }
}

DownloadItem.propTypes = {
    url: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired
};

export default inject('store')(observer(DownloadItem));