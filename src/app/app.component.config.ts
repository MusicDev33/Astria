const routeNavMap: {[key: string]: {sideNav: boolean, topNav: boolean}} = {
  login: { sideNav: false, topNav: false },
  dashboard: { sideNav: true, topNav: true},
  admindash: { sideNav: true, topNav: true},
  helpmarkdown: {sideNav: false, topNav: false}
};

export { routeNavMap };
