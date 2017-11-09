<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class Direccion extends REST_Controller {

	public  function __construct(){
 		parent::__construct();
 		$this->load->model('direccion_model');
     }
     

     public function index_get() {
      

        $dr = null;
        $dr = $this->direccion_model->get();

        if (!is_null($dr)) {
            $this->response($dr, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }

    public function byidTenant_get($id) {
        
  
          $rs = null;
          $rs = $this->direccion_model->byidTenant($id);
  
          if (!is_null($rs)) {
              $this->response($rs, 200);
          } else {
              $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
          }
      }


      public function companyByid_get($id) {
        
  
          $rs = null;
          $rs = $this->direccion_model->companyByid($id);
  
          if (!is_null($rs)) {
              $this->response($rs, 200);
          } else {
              $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
          }
      }
}
?>