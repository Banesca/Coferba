<?php if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Mercadolibre_model extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
	}

	public function postAdd($data)
	{
		$data               = json_decode(json_encode($data));
		$external_reference = (rand() * 8) . "_" . (time() * 4);
		try {
			$uri = 'http://localhost/Coferba/sistema/mpago/index.php';
//			$uri   = 'https://www.libreando.com.ar/mpago/index.php'; //solo server
			$param = [
				"clienteid" => '4013830484598491' ,
				"clientesecret" => '3Qbs4K4qUVs91H1FZvidIKBEzCsvpSju' ,
				"currency_id" => "ARG" ,
				"unit_price" => $data->monto ,
				"id" => $data->idPago ,
				"title" => "PAGO DE LLAVERO #" . $data->idPago ,
				//"uri"              => "http://localhost:8000/api/v1/addInfoPagoMercadoLibre",
				"notification_url" => $data->linkDeNotificacion ,
				//"uri"           => "http://bioonix.com/libreando/libreando/backend/public/api/v1/addInfoPagoMercadoLibre",  //solo server
				"external_reference" => $external_reference ,
				"back_url" => $data->back_url ,
			];

			$post_url;
			$headers = [
				'Content-Type: application/json' ,
			];

			$curl = curl_init();
			curl_setopt_array($curl , [
				CURLOPT_URL => $uri ,
				CURLOPT_RETURNTRANSFER => true ,
				CURLOPT_ENCODING => "" ,
				CURLOPT_MAXREDIRS => 10 ,
				CURLOPT_TIMEOUT => 30 ,
				CURLOPT_CUSTOMREQUEST => "POST" ,
				CURLOPT_POSTFIELDS => json_encode($param) ,
				CURLOPT_HTTPHEADER => [
					"accept: application/json" ,
				] ,
			]);

			$response = curl_exec($curl);
			$err      = curl_error($curl);
			curl_close($curl);

			if ($err){
				return json_encode([
					'message' => 'Ha ocurrido un error al registrar el pago, cod err 404' ,
					'status' => 404 ,
					'data' => $err
				]);
			} else {
				return json_encode([
					'message' => 'Datos registrados exitosamente' ,
					'status' => 200 ,
					'data' => $response
				]);
			}
		} catch (\Exception $e) {
			return json_encode([
				'message' => 'Ha ocurrido un error al registrar el pago' ,
				'status' => 404 ,
				'data' => $e
			]);
		}
	}
}

?>
