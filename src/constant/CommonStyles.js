import {scaleModerate} from './Scale';
import * as COLOR from './/Colors';

export const shadow = {
  lg: {
    // elevation: 50,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },

  md: {
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: {
      height: 4,
      width: 4
    }
  },

  sm: {
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },

  ssm: {
    elevation: 1.5,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },

  xlg: {
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      height: 10,
      width: 10
    }
  },
};

export const texts = {
  h0: {
    fontSize: scaleModerate(28),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',

  },
  h1: {
    fontSize: scaleModerate(24),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',

  },

  l_h1: {
    fontSize: scaleModerate(24),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,

  },

  r_h1: {
    fontSize: scaleModerate(24),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',

  },

  h2: {
    fontSize: scaleModerate(20),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',

  },

  l_h2: {
    fontSize: scaleModerate(20),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
  },

  l_h2_orange: {
    fontSize: scaleModerate(20),
    color: COLOR.NL_ORANGE,
  },

  h2_orange: {
    fontSize: scaleModerate(20),
    color: COLOR.NL_ORANGE,
    textAlign: 'center'
  },

  r_h2: {
    fontSize: scaleModerate(20),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',

  },

  h5: {
    fontSize: scaleModerate(16),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',

  },

  h3: {
    fontSize: scaleModerate(18),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',

  },

  h3_orange: {
    fontSize: scaleModerate(18),
    color: COLOR.NL_ORANGE,
    textAlign: 'center',

  },

  l_h3: {
    fontSize: scaleModerate(18),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,

  },

  r_h3: {
    fontSize: scaleModerate(18),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',

  },
  h4: {
    fontSize: scaleModerate(16),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',

  },
  h4_orange: {
    fontSize: scaleModerate(16),
    color: COLOR.NL_ORANGE,
    textAlign: 'center',

  },

  l_h4: {
    fontSize: scaleModerate(16),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign:'left'
  },

  r_h4: {
    fontSize: scaleModerate(16),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',
  },

  r_h5: {
    fontSize: scaleModerate(14),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',

  },

  l_h5: {
    fontSize: scaleModerate(14),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,

  },

  normal: {
    fontSize: scaleModerate(14),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',

  },

  white_bold: {
    fontSize: scaleModerate(14),
    fontWeight: 'bold',
    color: COLOR.WHITE,
    textAlign: 'center',

  },

  l_normal: {
    fontSize: scaleModerate(14),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
  },

  l_bold: {
    fontSize: scaleModerate(14),
    fontWeight: 'bold',
    color: COLOR.TEXT_LABEL,
  },

  r_normal: {
    fontSize: scaleModerate(14),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',
  },
  l_sm: {
    fontSize: scaleModerate(12),
    color: COLOR.TEXT_LABEL,
    textAlign: 'left',

  },

  l_placeholder: {
    fontSize: scaleModerate(14),
    color: COLOR.PLACEHOLDER_TEXT,
    textAlign: 'left',
  },

  sm: {
    fontSize: scaleModerate(12),
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',
    fontWeight: 'normal',
  },

  sm_l_error: {
    fontSize: scaleModerate(12),
    color: COLOR.ERROR,
    textAlign: 'left',
  },
  sm_error: {
    fontSize: scaleModerate(12),
    color: COLOR.ERROR,
    textAlign: 'center',

  },

  sm_placeholder: {
    fontSize: scaleModerate(12),
    color: COLOR.PLACEHOLDER_TEXT,
    textAlign: 'center',
  },

  sm_bold: {
    fontSize: scaleModerate(12),
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  md: {
    fontSize: scaleModerate(14),
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',
    fontWeight: 'normal',

  },

  r_sm: {
    fontSize: scaleModerate(12),
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',
    fontWeight: 'normal',

  },
  r_ssm: {
    fontSize: scaleModerate(10),
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',

  },

  ssm: {
    fontSize: scaleModerate(10),
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',

  },

  r_tiny: {
    fontSize: scaleModerate(8),
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',

  },

  r_tiny_bold: {
    fontSize: scaleModerate(8),
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',
    fontWeight: 'bold'
  },

  l_ssm: {
    fontSize: scaleModerate(10),
    color: COLOR.TEXT_LABEL,

  },

  gray_normal: {
    fontSize: scaleModerate(14),
    color: '#666',
    textAlign: 'center',

  },
}
