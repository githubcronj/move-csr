import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import Dashboard from "../pages/Dashboard/Dashboard";
import ConciergeFlow from "../pages/ConciergeFlowPage/CMain";
import Discovery from "../pages/Discovery/Discovery";
import MoversStep1 from "../pages/Movers/MoversStep1";
import MoversStep2 from "../pages/Movers/MoversStep2";
import MoversStep3 from "../pages/Movers/MoversStep3";
import MoversStep4 from "../pages/Movers/MoversStep4";
import MoversStep5 from "../pages/Movers/MoversStep5";
import MoversThankYou from "../pages/Movers/MoversThankYou";
import InternetStep1 from "../pages/InternetAndCable/InternetStep1";
import InternetStep2 from "../pages/InternetAndCable/InternetStep2";
import InternetDetailsStep from "../pages/InternetAndCable/InternetDetailsStep";
import InternetStep3 from "../pages/InternetAndCable/InternetStep3";
import InternetStep4 from "../pages/InternetAndCable/InternetStep4";
import InternetStep5 from "../pages/InternetAndCable/InternetStep5";
import InternetStep6 from "../pages/InternetAndCable/InternetStep6";
import InternetTVConfirmation from "../pages/InternetAndCable/InternetTVConfirmation";
import InternetThankyou from "../pages/InternetAndCable/InternetThankYou";
import InsuranceStep1 from "../pages/Insurance/InsuranceStep1";
import InsuranceStep2 from "../pages/Insurance/InsuranceStep2";
import InsuranceStep3 from "../pages/Insurance/InsuranceStep3";
import InsuranceStep4 from "../pages/Insurance/InsuranceStep4";
import InsuranceStep5 from "../pages/Insurance/InsuranceStep5";
import InsuranceStep6 from "../pages/Insurance/InsuranceStep6";
import InsuranceThankYou from "../pages/Insurance/InsuranceThankYou";
import SecurityStep1 from "../pages/Security/SecurityStep1";
import SecurityStep2 from "../pages/Security/SecurityStep2";
import SecurityStep3 from "../pages/Security/SecurityStep3";
import SecurityThankYou from "../pages/Security/SecurityThankYou";
import UtilitiesStep1 from "../pages/Utilities/UtilitiesStep1";
import UtilitiesStep2 from "../pages/Utilities/UtilitiesStep2";
import UtilitiesStep3 from "../pages/Utilities/UtilitiesStep3";
import UtilitiesThankYou from "../pages/Utilities/UtilitiesThankYou";
import HomeProsStep1 from "../pages/HomePros/HomeProsStep1";
import HomeProsStep2 from "../pages/HomePros/HomeProsStep2";
import HomeProsStep3 from "../pages/HomePros/HomeProsStep3";
import SummaryStep1 from "../pages/Summary/SummaryStep1";
import Summary from "../pages/Summary/Summary";
import SummaryFinal from "../pages/Summary/SummaryFinal";
import Login from "../pages/login/Login";
import EnergyStep1 from "../pages/Energy/EnergyStep1";
import EnergyStep2 from "../pages/Energy/EnergyStep2";

import EnergyStep3 from "../pages/Energy/EnergyStep3";
import EnergyStep4 from "../pages/Energy/EnergyStep4";
import EnergyStep5 from "../pages/Energy/EnergyStep5";

import EnergyThankYou from "../pages/Energy/EnergyThankyou";
import SolarStep1 from "../pages/Solar/SolarStep1";
import SolarStep2 from "../pages/Solar/SolarStep2";
import SpecialistStep1 from "../pages/SecuritySpecialist/securitySpecialistStep1";
import SpecialistStep2 from "../pages/SecuritySpecialist/securitySpecialistStep2";
import SpecialistStep3 from "../pages/SecuritySpecialist/securitySpecialistStep3";
import SpecialistStep4 from "../pages/SecuritySpecialist/securitySpecialistStep4";
import StatisticsHub from "../pages/StatisticsHub/StatisticsHub";
import Appointment from "../pages/Appointment/Appointment";

import "./routes.scss";

const Routes: React.FC = () => {
  const domain = window.location.hostname;
  let name: any = domain.split(".");

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={
            window.localStorage.getItem("newToken") ? Dashboard : Login
          }
        />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/statistics_hub" component={StatisticsHub} />
        <Route exact path="/appointment_view" component={Appointment} />

        <Route
          exact
          path="/dashboard/concierge/workflow"
          component={ConciergeFlow}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/discovery"
          component={Discovery}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/moversstep1"
          component={MoversStep1}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/moversstep2"
          component={MoversStep2}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/moversstep3"
          component={MoversStep3}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/moversstep4"
          component={MoversStep4}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/moversstep5"
          component={MoversStep5}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/moversthankyou"
          component={MoversThankYou}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/internetstep1"
          component={InternetStep1}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/internetstep2"
          component={InternetStep2}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/internetdetailsstep"
          component={InternetDetailsStep}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/internetstep3"
          component={InternetStep3}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/internetstep4"
          component={InternetStep4}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/internetstep5"
          component={InternetStep5}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/internetstep6"
          component={InternetStep6}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/internettvconfirmation"
          component={InternetTVConfirmation}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/internetthankyou"
          component={InternetThankyou}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/insurancestep1"
          component={InsuranceStep1}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/insurancestep2"
          component={InsuranceStep2}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/insurancestep3"
          component={InsuranceStep3}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/insurancestep4"
          component={InsuranceStep4}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/insurancestep5"
          component={InsuranceStep5}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/insurancestep6"
          component={InsuranceStep6}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/insurancethankyou"
          component={InsuranceThankYou}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/securitystep1"
          component={SecurityStep1}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/securitystep2"
          component={SecurityStep2}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/securitystep3"
          component={SecurityStep3}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/securitythankyou"
          component={SecurityThankYou}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/utilitiesstep1"
          component={UtilitiesStep1}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/utilitiesstep2"
          component={UtilitiesStep2}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/utilitiesstep3"
          component={UtilitiesStep3}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/utilitiesthankyou"
          component={UtilitiesThankYou}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/homeprosstep1"
          component={HomeProsStep1}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/homeprosstep2"
          component={HomeProsStep2}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/homeprosthankyou"
          component={HomeProsStep3}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/summarystep1"
          component={SummaryStep1}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/summary"
          component={Summary}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/summaryfinal"
          component={SummaryFinal}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/energystep1"
          component={EnergyStep1}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/energystep2"
          component={EnergyStep2}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/energystep3"
          component={EnergyStep3}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/energystep4"
          component={EnergyStep4}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/energythankyou"
          component={EnergyThankYou}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/energystep5"
          component={EnergyStep5}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/solarstep1"
          component={SolarStep1}
        />

        <Route
          exact
          path="/dashboard/concierge/workflow/solarstep2"
          component={SolarStep2}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/securityspecialiststep1"
          component={SpecialistStep1}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/securityspecialiststep2"
          component={SpecialistStep2}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/securityspecialiststep3"
          component={SpecialistStep3}
        />
        <Route
          exact
          path="/dashboard/concierge/workflow/securityspecialiststep4"
          component={SpecialistStep4}
        />
      </Switch>
    </div>
  );
};

export default Routes;
