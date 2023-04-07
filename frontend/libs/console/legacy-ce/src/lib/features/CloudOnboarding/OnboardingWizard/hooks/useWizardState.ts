import { useEffect, useState } from 'react';
import { useFamiliaritySurveyData } from '../../../Surveys';
import { trackCustomEvent } from '../../../Analytics';
import { useOnboardingData } from './useOnboardingData';
import { getWizardState } from '../utils';

export type WizardState =
  | 'familiarity-survey'
  | 'landing-page'
  | 'template-summary'
  | 'use-case-onboarding'
  | 'hidden';

export function useWizardState() {
  useEffect(() => {
    trackCustomEvent({
      location: 'Console',
      action: 'Load',
      object: 'Onboarding Wizard',
    });
  }, []);

  const {
    showFamiliaritySurvey,
    data: familiaritySurveyData,
    onSkip: familiaritySurveyOnSkip,
    onOptionClick: familiaritySurveyOnOptionClick,
  } = useFamiliaritySurveyData();

  const { data: onboardingData } = useOnboardingData();

  const [state, setState] = useState<WizardState>(
    getWizardState(showFamiliaritySurvey, onboardingData)
  );

  useEffect(() => {
    const wizardState = getWizardState(showFamiliaritySurvey, onboardingData);
    setState(wizardState);
  }, [onboardingData, showFamiliaritySurvey]);

  return {
    state,
    setState,
    familiaritySurveyData,
    familiaritySurveyOnSkip,
    familiaritySurveyOnOptionClick,
  };
}
