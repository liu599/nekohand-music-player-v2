import React from 'react';
import loadingStyles from './loading.less';

const Loading = () => (
  <div className={loadingStyles.loadingcontainer}>
    <div className="loading-star">
      <img src={require('../../assets/kv-slide-loading-star-icon.png')} alt="" className={loadingStyles.loading}/>
    </div>
    <div>
      <img src={require('../../assets/kv-slide-loading-text.png')} alt=""  className={loadingStyles.loadingtext} />
    </div>
  </div>
)

export default Loading;
