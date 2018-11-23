export interface POI {

  beaconId: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  explored: boolean;
  icons: {
    default: string;
    explored: string;
  };
  id: number;
  key: string;
  media: {
    content: {
      [key: string]: object;
    }
    image: {
      preview: string;
    };
    video: {
      arScene: string;
      iconScene: string;
    };
    vuforiaTargets: Array<string>;
  };
  name: {
    de: string;
    en: string;
    pl: string;
  };
  type: string;

}

export interface Legend {

  beaconId: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  explored: boolean;
  icons: {
    default: string;
    explored: string;
  };
  id: number;
  key: string;
  media: {
    content: {
      [key: string]: LegendContent;
    }
    image: {
      preview: string;
    };
    video: {
      arScene: string;
      iconScene: string;
    };
    vuforiaTargets: Array<string>;
  };
  name: {
    de: string;
    en: string;
    pl: string;
  };
  type: string;
}

export interface LegendContent {
  explored: ContentObject;
  preview: ContentObject;
  puzzle: {
    heading: string;
    hints: Array<Hint>;
    index: number;
    type: string;
    url: string;
  };
}

export interface RestSightContent {
  info: {
    heading: string,
    index: 0,
    type: string,
    url: string
  }
}

export interface Hint {
  index: number;
  url: string;
}

export interface ContentObject {
  heading: string;
  index: number;
  type: string;
  url: string;
}

export interface Restaurant {


  beaconId: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  explored: boolean;
  icons: {
    default: string;
    explored: string;
  };
  id: number;
  key: string;
  media: {
    content: {
      [key: string]: RestSightContent;
    }
    image: {
      preview: string;
    };
    video: {
      arScene: string;
      iconScene: string;
    };
    vuforiaTargets: Array<string>;
  };
  name: {
    de: string;
    en: string;
    pl: string;
  };
  type: string;
}

export interface Sight {

  beaconId: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  explored: boolean;
  icons: {
    default: string;
    explored: string;
  };
  id: number;
  key: string;
  media: {
    content: {
      [key: string]: RestSightContent;
    }
    image: {
      preview: string;
    };
    video: {
      arScene: string;
      iconScene: string;
    };
    vuforiaTargets: Array<string>;
  };
  name: {
    de: string;
    en: string;
    pl: string;
  };
  type: string;
}
