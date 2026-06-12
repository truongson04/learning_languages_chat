import { LANGUAGE_TO_FLAG } from "../constants/constants";

const GetFlag = ({ language }) => {
  if (!language) return <div>No flag</div>;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
};
export default GetFlag;
