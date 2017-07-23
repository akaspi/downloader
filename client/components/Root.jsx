import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import DownloadItem from './DownloadItem';

class Root extends React.Component {

    handleClick = () => {
        const url = this.refs.fileInput.value;
        this.props.store.startDownload(url);
    };

    createDownloadsList = (urls) => {
        return urls.map(url => <DownloadItem key={url} url={url} />);
    };

    render() {
        return (
          <div>
              <input placeholder='type file url...' ref='fileInput' />
              <button onClick={this.handleClick}>Download!</button>

              {
                  this.props.store.urlsToDownload.length === 0 ?
                    <span>Nothing to download...</span> : this.createDownloadsList(this.props.store.urlsToDownload)
              }
          </div>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default inject('store')(observer(Root));