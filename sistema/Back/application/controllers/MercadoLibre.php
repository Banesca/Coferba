<?php if (!defined('BASEPATH'))
	exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class MercadoLibre extends REST_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Mercadolibre_model');
	}

	public function crearEnlaceMercadoPago_post()
	{

		$pofile = null;
		if (!$this->post('data')){
			$this->response(null , 404);
		}

		$rr = json_decode($this->Mercadolibre_model->postAdd($this->post('data')));
		if ($rr->status==200){
			$this->response([
				$rr
			] , 200);
		}else{
			$this->response([
				$rr
			] , 404);
		}

		if ($rr==1){
			$this->response([
				'response' => "Registro exitoso" ,
				'url' => $rr->url
			] , 200);
		} elseif ($pofile==0) {
			$this->response(['error' => "ERROR INESPERADO"] , 500);
		} elseif ($pofile==2) {
			$this->response(['response' => ""] , 203);
		}
	}


}
