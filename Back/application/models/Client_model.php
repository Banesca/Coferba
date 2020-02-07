<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Client_model extends CI_Model
{
	
	public function __construct()
	{
		parent::__construct();
    }
	 
		

		public function addAdmin($client) {

			$user = null;
    
			$this->db->select("*")->from("tb_clients");
			$query = $this->db->where("tb_clients.name =", $client['name'])->get();
            if($query->num_rows() < 1){ 
               

				$this->db->insert('tb_clients', array(
					'idClientTypeFk' => $client['idClientTypeFk'],
					'name' => $client['name'],
					'address' => $client['address'],
					'addressLat' => $client['addressLat'],
					'addressLon' => $client['addressLon'],
					'idAgentFk' => $client['idAgentFk'],
					'businessName' => $client['businessName'],
					'CUIT' => $client['CUIT'],
					'idLocationFk' => $client['idLocationFk'],
					'idProvinceFk' => $client['idProvinceFk'],
					'mobile' => $client['mobile'],
					'mail' => $client['mail'],
					'observation' => $client['observation'],
					'pageWeb' => $client['pageWeb'],
					'idStatusFk' => 1,
					'mailFronKey' => $client['mailFronKey'],
					'observationOrderKey' => $client['observationOrderKey'],
					'isNotCliente' => $client['isNotCliente'],
					'idClientAdminFk' => $client['idClientAdminFk'],
					'mailServiceTecnic' => $client['mailServiceTecnic'],
					'observationSericeTecnic' => $client['observationSericeTecnic'],
					'mailCollection' => $client['mailCollection'],
					'observationCollection' => $client['observationCollection'],
					'idClientCompaniFk' => $client['idClientCompaniFk']
					
					
					)
				);

				if ($this->db->affected_rows() === 1) {
					$idClientFk = $this->db->insert_id();

					// DATOS DE FACTURCION
					$this->db->insert('tb_client_billing_information', array(
						'idClientFk' => $idClientFk,
						'businessNameBilling' => $client['billing_information']['businessNameBilling'],
						'cuitBilling' =>$client['billing_information']['cuitBilling'],
						'idLocationBillingFk'=> $client['billing_information']['idLocationBillingFk'],
						'idProvinceBillingFk'=> $client['billing_information']['idProvinceBillingFk'],
						'idTypeTaxFk' =>   $client['billing_information']['idTypeTaxFk']
					)
					);

					if(count(@$client['list_schedule_atention']) > 0
					&& count(@$client['list_phone_contact']) > 0
					&& count(@$client['list_client_user']) > 0
					)
					{
						
						// HORARIOS 
						foreach ($client['list_schedule_atention'] as $valor) {
							
							$this->db->insert('tb_client_schedule_atention', array(
								'idClienteFk' => $idClientFk,
								'day' => $valor['day'],
								'fronAm' => $valor['fronAm'],
								'toAm' => $valor['toAm'],
								'fronPm'=> $valor['fronPm'],
								'toPm'=> $valor['toPm']
							)
							);
						}
						//  TELEFONOS DE CONTACTO
						foreach (@$client['list_phone_contact'] as $valor) {
							
							$this->db->insert('tb_client_phone_contact', array(
								'idClientFk' => $idClientFk,
								'phoneContact' => $valor['phoneContact']
							)
							);
						}

						//  USUARIOS DE LA EMPRESA
						foreach ($client['list_client_user'] as $valor) {
							
							$this->db->insert('tb_client_users', array(
								'idClientFk' => $idClientFk,
								'idUserFk' => $valor['idUserFk']
							)
							);
						}

					


						
					}
					return 1;
				} else {
					return 0;
				}
				
			} else{
				return 2;
			}
		
		   
		}
	

		public function updateAdmin($client) {

			$this->db->set(
					array(
						'idClientTypeFk' => $client['idClientTypeFk'],
					'name' => $client['name'],
					'address' => $client['address'],
					'addressLat' => $client['addressLat'],
					'addressLon' => $client['addressLon'],
					'idAgentFk' => $client['idAgentFk'],
					'businessName' => $client['businessName'],
					'CUIT' => $client['CUIT'],
					'idLocationFk' => $client['idLocationFk'],
					'idProvinceFk' => $client['idProvinceFk'],
					'mobile' => $client['mobile'],
					'mail' => $client['mail'],
					'observation' => $client['observation'],
					'pageWeb' => $client['pageWeb'],
					'idStatusFk' => 1,
					'mailFronKey' => $client['mailFronKey'],
					'observationOrderKey' => $client['observationOrderKey'],
					'isNotCliente' => $client['isNotCliente'],
					'idClientAdminFk' => $client['idClientAdminFk'],
					'mailServiceTecnic' => $client['mailServiceTecnic'],
					'observationSericeTecnic' => $client['observationSericeTecnic'],
					'mailCollection' => $client['mailCollection'],
					'observationCollection' => $client['observationCollection'],
					'idClientCompaniFk' => $client['idClientCompaniFk']
						)
			)->where("idClient", $client['idClient'])->update("tb_clients");
	

			$this->db->set(
				array(
				'idClientFk' => $client['idClient'],
				'businessNameBilling' => $client['billing_information']['businessNameBilling'],
				'cuitBilling' =>$client['billing_information']['cuitBilling'],
				'idLocationBillingFk'=> $client['billing_information']['idLocationBillingFk'],
				'idProvinceBillingFk'=> $client['billing_information']['idProvinceBillingFk'],
				'idTypeTaxFk' =>   $client['billing_information']['idTypeTaxFk'])
		    )->where("idClientFk", $client['idClient'])->update("tb_client_billing_information");


			
			

		

					if(count(@$client['list_schedule_atention']) > 0
					&& count(@$client['list_phone_contact']) > 0
					&& count(@$client['list_client_user']) > 0
					)
					{
						$this->db->delete('tb_client_schedule_atention', array('idClienteFk' => $client['idClient']));  

						foreach ($client['list_schedule_atention'] as $valor) {
							
							$this->db->insert('tb_client_schedule_atention', array(
								'idClienteFk' => $valor['idClienteFk'],
								'day' => $valor['day'],
								'fronAm' => $valor['fronAm'],
								'toAm' => $valor['toAm'],
								'fronPm'=> $valor['fronPm'],
								'toPm'=> $valor['toPm']
							));
						}

						$this->db->delete('tb_client_phone_contact', array('idClientFk' => $client['idClient']));  

						foreach ($client['list_phone_contact'] as $valor) {
							
							$this->db->insert('tb_client_phone_contact', array(
								'idClientFk' => $valor['idClientFk'],
								'phoneContact' => $valor['phoneContact']
							));
						}

						$this->db->delete('tb_client_users', array('idClientFk' => $client['idClient']));  


						foreach ($client['list_client_user'] as $valor) {
							
							$this->db->insert('tb_client_users', array(
								'idClientFk' => $valor['idClienteFk'],
								'idUserFk' => $valor['idUserFk']
							)
							);
						}



						
						

						return true;
					}
			
		}
	

		

		public function delete($idClient) {

			$this->db->set(
				array('idStatusFk' =>  -1))->where("idClient", $idClient)->update("tb_clients"); 
			return true;
					
			
		}
	

		
		public function getadmin($id = null, $searchFilter = null,$idClientTypeFk = null) {
			$quuery = null;
			$rs = null;
	
			if (!is_null($id)) 
			{

	
				$this->db->select("*")->from("tb_clients");
				$quuery = $this->db->where("tb_clients.idClient =", $id)->get();
	
	
				if ($quuery->num_rows() === 1) {
					$rs =  $quuery->row_array();

					

					$this->db->select("*")->from("tb_client_schedule_atention");
					$quuery = $this->db->where("tb_client_schedule_atention.idClienteFk =", $id)->get();
					
					$rs1 =  $quuery->result_array();
					$rs['list_schedule_atention'] =  $rs1;


					$this->db->select("*")->from("tb_client_phone_contact");
					$quuery = $this->db->where("tb_client_phone_contact.idClientFk =", $id)->get();
					
					$rs2 =  $quuery->result_array();
					$rs['list_phone_contact'] =  $rs2;


					$this->db->select("*")->from("tb_client_users");
					$this->db->join('tb_user', 'tb_user.idUser = tb_client_users.idUserFk', 'inner');
					$quuery = $this->db->where("tb_client_users.idClientFk =", $id)->get();
					
					$rs3 =  $quuery->result_array();
					$rs['list_client_user'] =  $rs3;


					// DATOS DE FACTURCION
					$this->db->select("*")->from("tb_client_billing_information");
					$this->db->join('tb_tax', 'tb_tax.idTypeTax = tb_client_billing_information.idTypeTaxFk', 'inner');
					$this->db->join('tb_location', 'tb_location.idLocation = tb_client_billing_information.idLocationBillingFk', 'inner');
					$this->db->join('tb_province', 'tb_province.idProvince = tb_client_billing_information.idProvinceBillingFk', 'inner');
					$quuery = $this->db->where("tb_client_billing_information.idClientFk =", $id)->get();
					
					$rs4 =  $quuery->result_array();
					$rs['billing_information'] =  $rs4;

					

					return $rs;
				}
				return null;
			}else
			{ 
   
				$this->db->select("*")->from("tb_clients");
				$this->db->where("tb_clients.idStatusFk !=", -1);
	
		  
					/* Busqueda por filtro */
					
					if (!is_null($idClientTypeFk['idClientTypeFk'])) 
					{
						$this->db->where('tb_clients.idClientTypeFk', $idClientTypeFk['idClientTypeFk']);
					}

					if (!is_null($searchFilter['searchFilter'])) 
					{
						$this->db->like('tb_clients.name', $searchFilter['searchFilter']);
					}


					
   
   
			   $quuery = $this->db->order_by("tb_clients.idClient", "ASC")->get();
   
   
			   if ($quuery->num_rows() > 0) {

					$rs =  $quuery->result_array();


					$i = 0;
					foreach ($quuery->result() as &$row){

						

						$this->db->select("*")->from("tb_client_schedule_atention");
						$quuery = $this->db->where("tb_client_schedule_atention.idClienteFk =", $row->idClient)->get();
						
						$rs1 =  $quuery->result_array();
						$rs[$i]['list_schedule_atention'] =  $rs1;


						$this->db->select("*")->from("tb_client_phone_contact");
						$quuery = $this->db->where("tb_client_phone_contact.idClientFk =", $row->idClient)->get();
						
						$rs2 =  $quuery->result_array();
						$rs[$i]['list_phone_contact'] =  $rs2;


						$this->db->select("*")->from("tb_client_users");
						$this->db->join('tb_user', 'tb_user.idUser = tb_client_users.idUserFk', 'inner');
						$quuery = $this->db->where("tb_client_users.idClientFk =", $row->idClient)->get();
						
						$rs3 =  $quuery->result_array();
						$rs[$i]['list_client_user'] =  $rs3;


						// DATOS DE FACTURCION
						$this->db->select("*")->from("tb_client_billing_information");
						$this->db->join('tb_tax', 'tb_tax.idTypeTax = tb_client_billing_information.idTypeTaxFk', 'inner');
						$this->db->join('tb_location', 'tb_location.idLocation = tb_client_billing_information.idLocationBillingFk', 'inner');
						$this->db->join('tb_province', 'tb_province.idProvince = tb_client_billing_information.idProvinceBillingFk', 'inner');
						$quuery = $this->db->where("tb_client_billing_information.idClientFk =", $row->idClient)->get();
						
						$rs4 =  $quuery->result_array();
						$rs[$i]['billing_information'] =  $rs4;


						$i++;
					}
					
					return $rs;

				   return null;
			   }
			   return null;
		   }
		
	
		}
	


		public function getModules() {
			$query = $this->db->select("*")->from("tb_modules")->get();
			if ($query->num_rows() > 0) {
				$rs = $query->result_array();
				return $rs;
			}
			return null;
				
		}
	
	
	}
?>
