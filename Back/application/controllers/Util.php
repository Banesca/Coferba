<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class Util extends REST_Controller {

	public  function __construct()
 	{
 		parent::__construct();
 		$this->load->model('util_model');
 	}

	public function clientType_get() {
       
        $user = null;
        $user = $this->util_model->getClientType();

        if (!is_null($user)) {
            $this->response($user, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
	}

	public function agent_get() {
       
        $user = null;
        $user = $this->util_model->getAgent();

        if (!is_null($user)) {
            $this->response($user, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
	}

	public function localidad_get($idProvinceFk) {
           
        if (!$idProvinceFk) {
            $this->response(NULL, 404);
        }
        $user = null;
        $user = $this->util_model->getLocalidad($idProvinceFk);

        if (!is_null($user)) {
            $this->response($user, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
	}
	
	
	public function provincia_get() {
	
        $user = null;
        $user = $this->util_model->getProvincia();

        if (!is_null($user)) {
            $this->response($user, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
	}


	public function taxtype_get() {
	   

        $user = null;
        $user = $this->util_model->getTaxtype();

        if (!is_null($user)) {
            $this->response($user, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
	}

}

?>