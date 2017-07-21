import React from 'react';
import { init, download, MESSAGE_TYPES } from '../utils/downloadsHandler';
import DownloadItem from './DownloadItem';

export default class Root extends React.Component {
    constructor() {
        super();
        this.state = {
            downloads: {}
        }
    }

    componentWillMount() {
        init(this.handleDownloadMessage);
    }

    handleDownloadMessage = message => {
      switch (message.type) {
          case MESSAGE_TYPES.DOWNLOAD_START: {
              const { url, fileSize } = message;
              const newDownloads = Object.assign({}, this.state.downloads);
              newDownloads[url].fileSize = fileSize;
              this.setState({ downloads: newDownloads});
              break;
          }

          case MESSAGE_TYPES.DOWNLOADING: {
              const { url, chunk } = message;
              let newDownloads = Object.assign({}, this.state.downloads);
              newDownloads[url].chunk = newDownloads[url].chunk + chunk;
              this.setState({ downloads: newDownloads});
              break;
          }

          case MESSAGE_TYPES.DOWNLOAD_END: {

          }

      }
    };

    handleClick = () => {
        const url = this.refs.fileInput.value;
        const newDownloads = Object.assign({}, this.state.downloads);
        newDownloads[url] = { fileSize: 0, chunk: 0 };

        this.setState({
            downloads: newDownloads
        });
    };

    createDownloadsList = () => {
        return Object.keys(this.state.downloads).map(url => {
            const downloadData = this.state.downloads[url];
            return (
                <DownloadItem
                    url={url}
                    fileSize={downloadData.fileSize}
                    chunk={downloadData.chunk}
                    download={download}
                />
            );
        });
    };

    render() {
        return (
          <div>
              <input placeholder='type file url...' ref='fileInput' />
              <button onClick={this.handleClick}>Download!</button>

              {
                  Object.keys(this.state.downloads).length === 0 ?
                    <span>Nothing to download...</span> : this.createDownloadsList()
              }
          </div>
        );
    }
}