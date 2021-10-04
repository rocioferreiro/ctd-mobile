import {useTranslation} from "react-i18next";
import * as React from "react";


export const onuPictures = () => {

  const {t} = useTranslation();

  const obj1 = {image: require(`../../../assets/images/objetive1.png`), title: t('onu-objective-info.no-poverty'), description: t('onu-objective-info.no-poverty-description')}
  const obj2 = {image: require(`../../../assets/images/objetive2.png`), title: t('onu-objective-info.zero-hunger'), description: t('onu-objective-info.zero-hunger-description')}
  const obj3 = {image: require(`../../../assets/images/objetive3.png`), title: t('onu-objective-info.good-health') , description: t('onu-objective-info.good-health-description')}
  const obj4 = {image: require(`../../../assets/images/objetive4.png`), title: t('onu-objective-info.quality-education'), description:t('onu-objective-info.quality-education-description')}
  const obj5 = {image: require(`../../../assets/images/objetive5.png`), title: t('onu-objective-info.gender'), description: t('onu-objective-info.gender-description')}
  const obj6 = {image: require(`../../../assets/images/objetive6.png`), title: t('onu-objective-info.clean-water'), description: t('onu-objective-info.clean-water-description')}
  const obj7 = {image: require(`../../../assets/images/objetive7.png`), title: t('onu-objective-info.energy'), description: t('onu-objective-info.energy-description')}
  const obj8 = {image: require(`../../../assets/images/objetive8.png`), title: t('onu-objective-info.work'), description: t('onu-objective-info.work-description')}
  const obj9 = {image: require(`../../../assets/images/objetive9.png`), title: t('onu-objective-info.industry'), description: t('onu-objective-info.industry-description')}
  const obj10 = {image: require(`../../../assets/images/objetive10.png`), title: t('onu-objective-info.inequalities'), description: t('onu-objective-info.inequalities-description')}
  const obj11 = {image: require(`../../../assets/images/objetive11.png`), title: t('onu-objective-info.cities'), description: t('onu-objective-info.cities-description')}
  const obj12 = {image: require(`../../../assets/images/objetive12.png`), title: t('onu-objective-info.consumption'), description: t('onu-objective-info.consumption-description') }
  const obj13 = {image: require(`../../../assets/images/objetive13.png`), title: t('onu-objective-info.climate'), description: t('onu-objective-info.climate-description')}
  const obj14 = {image: require(`../../../assets/images/objetive14.png`), title: t('onu-objective-info.life-water'), description: t('onu-objective-info.life-water-description')}
  const obj15 = {image: require(`../../../assets/images/objetive15.png`), title: t('onu-objective-info.life-land'), description: t('onu-objective-info.life-land-description')}
  const obj16 = {image: require(`../../../assets/images/objetive16.png`), title: t('onu-objective-info.peace'), description: t('onu-objective-info.peace-description')}
  const obj17 = {image: require(`../../../assets/images/objetive17.png`), title: t('onu-objective-info.partner'), description: t('onu-objective-info.partner-description')}

  return [obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9, obj10, obj11, obj12, obj13, obj14, obj15, obj16, obj17]
}
