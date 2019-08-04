import React from 'react';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
// import App from './containers/App';
import Initializer from './containers/Initializer';
import lifecycles from './lifecycles';
import trads from './translations';

const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;

function Comp(props) {
  return (
    <div>
      <h1>Demo plugin</h1>
      <p>Hello in demo plugin</p>
    </div>
  );
}

const plugin = {
  blockerComponent: null,
  blockerComponentProps: {},
  description: pluginDescription,
  icon: pluginPkg.strapi.icon,
  id: pluginId,
  initializer: Initializer,
  injectedComponents: [],
  layout: null,
  lifecycles,
  leftMenuLinks: [],
  leftMenuSections: [],
  mainComponent: Comp,
  name: pluginPkg.strapi.name,
  preventComponentRendering: false,
  trads,
};

export default plugin;
