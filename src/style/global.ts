import { createGlobalStyle } from 'styled-components';
import '../scss/fonts.scss';
import { baseTheme } from './theme';

export default createGlobalStyle`
*{
  margin: 0;  
  padding: 0;
  box-sizing: border-box;
}
body{
  font-family: 'Mulish', sans-serif;
  font-size: 14px;
  overflow-x: hidden;
  @media ${baseTheme.media.medium} {
    overflow-x: scroll;
  }
  
}
h1{
  font-size: 24px;
  font-weight: 700;
}
h3{
  font-size: 19px;
  font-weight: 700;
}
a{
  text-decoration: none;
  &:visited{
    color: inherit;
  }
}

.container{
  margin-left: ${baseTheme.sizes.navWidth};
  padding: 30px;
  
  &__content{
    max-width: ${baseTheme.sizes.container};
    margin: auto;
  }
  @media ${baseTheme.media.large} {
    margin-left: ${baseTheme.sizes.navWidthSmall};
  }
  
}
#root{
  min-width: 900px;
}

.row{
  display: flex;
  align-items: center;
  
}

.btn-primary{
  background: #2F80ED;
    color: white;
    font-weight: 600;
    font-size: 14px;
    padding: 8px 20px;
    line-height: 24px;
    border-radius: 8px;
    border: none;
    display: block;
    cursor: pointer;
}

button{
  cursor: pointer;
  a{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}




`;
