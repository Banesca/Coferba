<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class Seeds extends REST_Controller {

	public  function __construct()
 	{
 		parent::__construct();
 		$this->load->model('seeds_model');
	 }
	 
	     /* SERVICIO GET QUE OBTIENE TODO LOS MODELOS REGISTRADOS */
		 public function Modules_get() {

			$user = $this->seeds_model->getModules();
			if (!is_null($user)) {
				$this->response($user, 200);
			} else {
				$this->response(array('error' => 'NO HAY RESULTADOS'), 404);
			}
		}

		public function ProductClassification_get() {

			$user = $this->seeds_model->getProductClassification();
			if (!is_null($user)) {
				$this->response($user, 200);
			} else {
				$this->response(array('error' => 'NO HAY RESULTADOS'), 404);
			}
		}

		public function DiviceOpening_get() {

			$user = $this->seeds_model->getDiviceOpening();
			if (!is_null($user)) {
				$this->response($user, 200);
			} else {
				$this->response(array('error' => 'NO HAY RESULTADOS'), 404);
			}
		}


		
	
	}
?>
