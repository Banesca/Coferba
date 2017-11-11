<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class Department extends REST_Controller {

	public  function __construct()
 	{
 		parent::__construct();
 		$this->load->model('department_model');
 	}


 	public function index_post() {
       
        if (!$this->post('department')) {
            $this->response(NULL, 404);
        }

        $department = $this->department_model->add($this->post('department'));

        if (!is_null($department)) {
            $this->response(array('response' => "DEPARTAMENTO AGREGADO "), 200);
        } else {
            $this->response(array('error' => "ERROR INESPERADO"), 500);
        }
    }

 
    

     /* SERVICIO EDITA UN USUARIOS  */
    public function update_post() {

        if (!$this->post('department')) {
            $this->response(NULL, 404);
        }

        $rs = $this->department_model->update($this->post('department'));

        if (!is_null($rs)) {
            $this->response(array('response' => "DEPARTAMENTO  EDITADO"), 200);
        } else {
            $this->response(array('error' => "ERROR INESPERADO"), 500);
        }
    }


      /* SERVICIO INACTIVA  UN USUARIOS POR ID */
    public function inactive_get($id) {
        if (!$id) {
            $this->response(NULL, 404);
        }

        $department = null;
        $department = $this->department_model->changueStatus($id, 0);

        if (!is_null($department)) {
            $this->response($department, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }

     /* SERVICIO ACTIVAR  UN USUARIOS POR ID */
    public function active_get($id) {
        if (!$id) {
            $this->response(NULL, 404);
        }

        $department = null;
        $department = $this->department_model->changueStatus($id, 1);

        if (!is_null($department)) {
            $this->response($department, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }

    /* SERVICIO INACTIVA  UN USUARIOS POR ID */
    public function delete_delete($id) {
        if (!$id) {
            $this->response(NULL, 404);
        }

        $department = null;
        $department = $this->department_model->changueStatus($id, -1);

        if (!is_null($department)) {
            $this->response($department, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }


     public function find_get($id) {
        if (!$id) {
            $this->response(NULL, 404);
        }

        $department = null;
        $department = $this->department_model->get($id);

        if (!is_null($department)) {
            $this->response($department, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }

    public function byIdDireccion_get($id) {
        if (!$id) {
            $this->response(NULL, 404);
        }

        $department = null;
        $department = $this->department_model->byIdDireccion($id);

        if (!is_null($department)) {
            $this->response($department, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }
    /* SERVICIO GET QUE RETORNA LOS DEPARTAMENTO SEGUN EL ID DE DIRECION Y ID DEL INQUILINO */
    public function byIdTenantYDireccion_get($id, $idT) {
        if (!$id || !$idT) {
            $this->response(NULL, 404);
        }

        $department = null;
        $department = $this->department_model->byIdTenantYDireccion($id, $idT);

        if (!is_null($department)) {
            $this->response($department, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }

    /* SERVICIO GET QUE OBTIENE LOS USUARIOS POR FILTRO */
    public function search_post() {

        $searchFilter = $this->post('filter');

        $department = $this->department_model->get(null, $searchFilter);

        if (!is_null($department)) {
            $this->response($department, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }
 }
 ?>