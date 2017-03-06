import _                 from 'lodash';
import $                 from 'jquery';
import React             from 'react';
import { connect }       from 'react-redux';
import TinyWrapper       from './tiny_wrapper';
import guid              from '../../../utils/guid';
import * as AssetActions from '../../../actions/qbank/assets';

function select(state, props) {
  return {
    uploadedAssets: state.uploadedAssets[props.uploadScopeId]
  };
}

export class OeaEditor extends React.Component {
  static propTypes = {
    onBlur: React.PropTypes.func.isRequired,
    bankId: React.PropTypes.string.isRequired,
    uploadScopeId: React.PropTypes.string.isRequired,
    uploadMedia: React.PropTypes.func.isRequired,
    uploadedAssets: React.PropTypes.shape({}).isRequired,
    fileIds: React.PropTypes.shape({}).isRequired,
  };

  constructor() {
    super();
    this.state = {
      focused: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const assetPath = `uploadedAssets['${this.state.mediaGuid}']`;
    if (!_.get(this.props, assetPath) && _.get(nextProps, assetPath)) {
      const imageUrl = _.get(nextProps, `${assetPath}.assetContents[0].url`);
      this.state.mediaCallback(imageUrl);
      this.setState({ mediaCallback: null, mediaGuid: null });
    }
  }

  onBlur(editorText, isChanged) {
    this.setState({ focused: false });
    if (!isChanged) return;

    let text = editorText;
    const fileIds = {};

    const doc = $(`<div>${text}</div>`);
    $('img, source', doc).each((i, el) => {
      const media = $(el);
      const match = /.*\/(.*)\/stream$/.exec(media.attr('src'));
      if (match) {
        const assetContentId = match[1];
        const mediaGuid = this.findMediaGuid(assetContentId);
        text = text.replace(media.attr('src'), `AssetContent:${mediaGuid}`);
      }
    });

    _.each(this.props.uploadedAssets, (asset, mediaGuid) => {
      fileIds[mediaGuid] = {
        assetId: asset.id,
        assetContentId: asset.assetContents[0].id,
        assetContentTypeId: asset.assetContents[0].genusTypeId
      };
    });

    this.props.onBlur(text, fileIds);
  }

  findMediaGuid(assetContentId) {
    // try to find in existing fileIds, otherwise try to find in newly uploaded fileIds.
    return _.findKey(this.props.fileIds, fileData => (
      fileData.assetContentId === assetContentId
    )) || _.findKey(this.props.uploadedAssets, fileData => (
      fileData.assetContents[0].id === assetContentId
    ));
  }

  uploadMedia(file, mediaCallback) {
    const mediaGuid = guid();
    this.props.uploadMedia(
      file,
      mediaGuid,
      this.props.uploadScopeId,
      this.props.bankId
    );
    this.setState({
      mediaGuid,
      mediaCallback,
    });
  }

  render() {
    const active = this.state.focused ? 'is-focused' : '';

    return (
      <div className="author--c-input__contain">
        <div className={`author--c-text-input author--c-text-input--medium author--c-wysiwyg ${active}`}>
          <TinyWrapper
            {...this.props}
            uploadMedia={(file, mediaCallback) => this.uploadMedia(file, mediaCallback)}
            onBlur={(editorText, isChanged) => this.onBlur(editorText, isChanged)}
            onFocus={() => this.setState({ focused: true })}
          />
        </div>
        <div className={`author--c-input__bottom ${active}`} />
      </div>
    );
  }
}

export default connect(select, AssetActions)(OeaEditor);
