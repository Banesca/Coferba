<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class Clientes extends REST_Controller {

	public  function __construct()
 	{
 		parent::__construct();
 		$this->load->model('client_model');
 	}

	public function admin_post(){
		
		$pofile = null;
        if (!$this->post('client')) {
            $this->response(NULL, 404);
        }

        $pofile = $this->client_model->addAdmin($this->post('client'));

        if ($pofile == 1) {
			$this->response(array('response' => "Registro exitoso"), 200);
        } else if ($pofile == 0) { 
            $this->response(array('error' => "ERROR INESPERADO"), 500);
		} else if ($pofile == 2) { 
			$this->response(array('response' => "Cliente ya se encuentra registrado"), 203);
		}
	}


	
	public function updateadmin_post() {

		$rs = $this->client_model->updateAdmin($this->post('client'));
		if (!is_null($rs)) {
			$this->response("Actualizado", 200);
		} else {
			$this->response(array('error' => 'NO HAY RESULTADOS'), 404);
		}
	}

	public function delete_delete($id) {

		$rs = $this->client_model->delete($id);
		if (!is_null($rs)) {
			$this->response("Eliminado", 200);
		} else {
			$this->response(array('error' => 'NO HAY RESULTADOS'), 404);
		}
	}

	


	public function findadmin_get($id) {
        if (!$id) {
            $this->response(NULL, 404);
        }

        $user = null;
        $user = $this->client_model->getadmin($id);

        if (!is_null($user)) {
            $this->response($user, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
	}

	/*

	public function modules_get() {
       
        $user = null;
        $user = $this->profiles_model->getModules();

        if (!is_null($user)) {
            $this->response($user, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
	}
	*/
	public function search_post() {

		$searchFilter = $this->post('filter');
		$idClientTypeFk = $this->post('idClientTypeFk');
		

        $user = $this->client_model->getadmin(null, $searchFilter,$idClientTypeFk);

        if (!is_null($user)) {
            $this->response($user, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }

}