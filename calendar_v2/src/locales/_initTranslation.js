import i18n from 'i18next';
import PL_translation from './PL_translation.json';
import EN_translation from './EN_translation.json';


function _initTranslation() 
{
    i18n.init({
        interpolation: { escapeValue: false },
        lng: 'pl',
        resources: {
          en: {
            translation: EN_translation
          },
          pl: {
            translation: PL_translation
          }
        }
      });



      return i18n;
}



export {_initTranslation as initTranslation }