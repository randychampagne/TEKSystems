import React, { StatelessComponent } from "react";
import Dropdown from "react-dropdown";
import classNames from "classnames";
import { RoomProps } from "./interfaces";
import { getDDOptsFromVacancies } from "./utils";
import "react-dropdown/style.css";
import "./Room.scss";

const Room: StatelessComponent<RoomProps> = props => {
  const {
    name,
    label,
    isActive,
    toggleRoomActivation,
    isRequired,
    vacancies,
    requests,
    updateRoomRequests
  } = props;

  const showValidationError =
    isActive &&
    ((requests.adult.touched || requests.child.touched) && !requests.isValid);

  const options = getDDOptsFromVacancies({ vacancies });

  return (
    <section
      className={classNames("room", {
        room__disabled: !isActive,
        room__valid:
          isActive &&
          (requests.adult.touched || requests.child.touched) &&
          requests.isValid,
        room__invalid:
          isActive &&
          (requests.adult.touched || requests.child.touched) &&
          !requests.isValid
      })}
      data-testid="room"
      role="group"
    >
      <header className="room__header">
        {!isRequired && (
          <input
            type="checkbox"
            name={name}
            id={`${name}__activation`}
            checked={isActive}
            onChange={event => toggleRoomActivation({ event })}
            data-testid="room__header__checkbox"
          />
        )}
        <label htmlFor={`${name}__activation`}>
          <h2>{label}</h2>
        </label>
      </header>
      <main
        className={classNames("room__requests", {
          room__requests__active: isActive
        })}
        data-testid="room__requests"
      >
        <div role="group">
          <h3>
            Adults
            <br />
            (18+)
          </h3>
          <Dropdown
            options={options.adult}
            onChange={({ value }) =>
              updateRoomRequests({
                name,
                data: { adult: { value: +value, touched: true } }
              })
            }
            value={{
              label: `${requests.adult.value}`,
              value: `${requests.adult.value}`
            }}
            disabled={!isActive}
            data-testid="room__requests_dropdown--adult"
          />
        </div>
        <div role="group">
          <h3>
            Children
            <br />
            (0 - 17)
          </h3>
          <Dropdown
            options={options.child}
            onChange={({ value }) =>
              updateRoomRequests({
                name,
                data: { child: { value: +value, touched: true } }
              })
            }
            value={{
              label: `${requests.child.value}`,
              value: `${requests.child.value}`
            }}
            disabled={!isActive}
            data-testid="room__requests_dropdown--child"
          />
        </div>
      </main>
      <footer className="room__requests__validation">
        {showValidationError && (
          <div className="room__requests__validation__message" role="alert">
            Please select at least 1 adult or child room
          </div>
        )}
      </footer>
    </section>
  );
};

/*
Room.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isRequired: PropTypes.bool.isRequired,
  toggleRoomActivation: PropTypes.func.isRequired,
  requests: PropTypes.shape({
    adult: PropTypes.shape({
      value: PropTypes.number.isRequired,
      touched: PropTypes.bool.isRequired
    }).isRequired,
    child: PropTypes.shape({
      value: PropTypes.number.isRequired,
      touched: PropTypes.bool.isRequired
    }).isRequired
  }).isRequired,
  updateRoomRequests: PropTypes.func.isRequired,
  vacancies: PropTypes.shape({
    adult: Validate.prop.greaterThanZero,
    child: Validate.prop.greaterThanZero
  }).isRequired,
  options: PropTypes.shape({
    adult: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    child: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  }).isRequired
};
*/

export default Room;