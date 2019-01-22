export interface POI {

  beaconId: number;
  publishingTimestamp: number;
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
  type: string;

}

export interface LegendContent {
  name: string;
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
  name: string;
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

