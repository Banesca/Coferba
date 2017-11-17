<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class Ticket extends REST_Controller {

	public  function __construct()
 	{
 		parent::__construct();
 		$this->load->model('ticket_model');
 	}

 	/* SERVICIO QUE CREA UN TICKET */
	public function index_post()
	{

		$rs = $this->ticket_model->add($this->post('ticket'));        
                if(!is_null($rs))
                {
                	$this->response(array('response' => $rs),200);
                }
                else
                {
                	$this->response(array('error' => "ERROR INESPERADO"),500);
                }
               
    }
    
    /* SERVICIO INACTIVA  UN USUARIOS POR ID */
    public function cancel_get($id) {
        if (!$id) {
            $this->response(NULL, 404);
        }

        $rs = null;
        $rs = $this->ticket_model->cancel($id);

        if (!is_null($rs)) {
            $this->response($rs, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }

     /* SERVICIO INACTIVA  UN USUARIOS POR ID */
     public function aprobated_get($id) {
        if (!$id) {
            $this->response(NULL, 404);
        }

        $rs = null;
        $rs = $this->ticket_model->aprobated($id);

        if (!is_null($rs)) {
            $this->response($rs, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }


         /* SERVICIO GET QUE OBTIENE TODO LOS TIKECT REGISTRADOS */
            public function all_post() {

                $filiter = $this->post();
                //print_r($filiter);
                $rs = $this->ticket_model->get(null,$filiter);        
                if(!is_null($rs))
                {
                        $this->response(array('response' => $rs),200);
                }
                else
                {
                    $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
                }
            }


            /* SERVICIO GET QUE OBTIENE TODO LOS USUARIOS REGISTRADOS */
            public function filter_get() {

                $filter = $this->ticket_model->getFilterForm();
                if (!is_null($filter)) {
                    $this->response($filter, 200);
                } else {
                    $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
                }
            }

}
?>