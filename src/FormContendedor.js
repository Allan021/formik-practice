import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { expresiones } from "./helpers/expresiones";
export const FormContendedor = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSubmit = (values, { reset }) => {
    console.log(values);
    reset();
  };

  return (
    <div className="form-contended">
      <h1>Formulario de contacto</h1>
      <Formik
        initialValues={{
          nombre: "Allan catro",
          email: "allancastro@gmail.com123",
          password: "allan123456",
          password2: "allan123456",
        }}
        onSubmit={handleSubmit}
        validate={(values) => {
          let errores = {};

          if (!values.nombre) {
            errores.nombre = "El nombre de usuario es obligatorio";
          } else if (!expresiones.nombre.test(values.nombre)) {
            errores.nombre =
              "El nombre de usuario no puede contener numeros ni simbolos";
          }

          if (!values.email) {
            errores.email = "El email de usuario es obligatorio";
          } else if (!expresiones.correo.test(values.email)) {
            errores.email = "El usuario inrgesado es incorrrecto";
          }

          if (!values.password) {
            errores.password = "La primera contraseña es requerida";
          } else if (!expresiones.password.test(values.password)) {
            errores.password =
              "La contraseña debe contener simbolos, una mayuscula y minusculas";
          }

          if (!values.password2) {
            errores.password2 = "La segunda contraseña es requerida";
          } else if (!expresiones.password.test(values.password2)) {
            errores.password2 =
              "La contraseña debe contener simbolos, una mayuscula y minusculas";
          }

          if (values.password2 !== values.password) {
            errores.passwords = "Las contraseñas no coinciden";
          }

          console.log(errores);
          return errores;
        }}
      >
        {({ errors, touched }) => (
          <Form className="form-content">
            <Field
              className="border-error"
              className={`form-input ${
                touched.nombre && errors.nombre && "border-error "
              }`}
              placeholder="Ingresa un nombre"
              name="nombre"
            />
            <ErrorMessage
              name="nombre"
              component={() => (
                <div className="error-message">{errors.nombre}</div>
              )}
            />
            <Field
              type="text"
              placeholder="Ingresa un correo"
              name="email"
              className={`form-input ${
                touched.email && errors.email && "border-error "
              }`}
            />

            <ErrorMessage
              name="email"
              component={() => <p className="error-message">{errors.email}</p>}
            />
            <Field
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Ingresa una contraseña"
              name="password"
              className={`form-input ${
                touched.password && errors.password && "border-error"
              }`}
            />
            <div className="form-checkbox">
              <input
                type="checkbox"
                onChange={() => {
                  setShowPassword(!showPassword);
                }}
                name=""
                id=""
              />{" "}
              <span>Show password</span>
            </div>

            <ErrorMessage
              name="password"
              component={() => (
                <p className="error-message">{errors.password}</p>
              )}
            />
            <Field
              type={`${showPassword2 ? "text" : "password"}`}
              type="password"
              className={`form-input ${
                touched.password2 && errors.password2 && "border-error "
              }`}
              placeholder="Repite la contraseña"
              name="password2"
            />

            <div className="form-checkbox">
              <input
                type="checkbox"
                onChange={() => {
                  setShowPassword2(!showPassword2);
                }}
                name="show2"
                id=""
              />{" "}
              <span>Show password</span>
            </div>
            <ErrorMessage
              name="password2"
              component={() => (
                <p className="error-message">{errors.password2}</p>
              )}
            />
            {touched.password2 && errors.passwords && (
              <p className="error-message">{errors.passwords}</p>
            )}
            <button type="submit" className="btn-submit">
              Enviar Datos
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
