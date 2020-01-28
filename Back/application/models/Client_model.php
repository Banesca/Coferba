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

						


						
					}
					return 1;
				} else {
					return 0;
				}
				
			} else{
				return 2;
			}
		
		   
		}
/*
		public function update($profile) {

			$this->db->set(
					array('name' =>  $profile['name'])
			)->where("idProfiles", $profile['idProfiles'])->update("tb_profiles");
	

				if(count(@$profile['list_id_modules']) > 0)
					{
						$this->db->delete('tb_profiles_modules', array('idProfilesFk' => $profile['idProfiles']));  

						foreach ($profile['list_id_modules'] as $valor) {
							
							$this->db->insert('tb_profiles_modules', array(
								'idProfilesFk' => $profile['idProfiles'],
								'idModuleFk' => $valor['idModuleFk'])
							);
						}
						return true;
					}
			
		}

		public function delete($idProfiles) {

			$this->db->set(
				array('idStatus' =>  -1))->where("idProfiles", $idProfiles)->update("tb_profiles"); 
			return true;
					
			
		}

		public function get($id = null, $searchFilter = null) {
			$quuery = null;
			$rs = null;
	
			if (!is_null($id)) 
			{
	
				$this->db->select("*")->from("tb_profiles");
				$quuery = $this->db->where("tb_profiles.idProfiles =", $id)->get();
	
	
				if ($quuery->num_rows() === 1) {
					$rs =  $quuery->row_array();


					$this->db->select("*")->from("tb_profiles_modules");
					$this->db->join('tb_modules', 'tb_modules.idModule = tb_profiles_modules.idModuleFk', 'inner');
					$quuery = $this->db->where("tb_profiles_modules.idProfilesFk =", $id)->get();

					$rs2 =  $quuery->result_array();

					$rs['modules'] =  $rs2;

					return $rs;
				}
				return null;
			}else
			{ 
   
				$this->db->select("*")->from("tb_profiles");
				$this->db->where("tb_profiles.idStatus !=", -1);
   
		  
					/* Busqueda por filtro */
				/*	if (!is_null($searchFilter['searchFilter'])) 
					{
						$this->db->like('tb_profiles.name', $searchFilter['searchFilter']);
					}
   
   
			   $quuery = $this->db->order_by("tb_profiles.idProfiles", "ASC")->get();
   
   
			   if ($quuery->num_rows() > 0) {

					$rs =  $quuery->result_array();

					$list =  array();

					$i = 0;
					foreach ($quuery->result() as &$row){

						$this->db->select("*")->from("tb_profiles_modules");
						$this->db->join('tb_modules', 'tb_modules.idModule = tb_profiles_modules.idModuleFk', 'inner');
						$quuery = $this->db->where("tb_profiles_modules.idProfilesFk =", $row->idProfiles)->get();

						$rs2 =  $quuery->result_array();
						$rs[$i]['modules'] =  $rs2;
						$i++;
					}
					

				   return $rs;
			   }
			   return null;
		   }
		}

		public function deleteModules($idProfileModule) {

			$this->db->delete('tb_profiles_modules', array('idProfileModule' => $idProfileModule));  
			return true;
					
			
		}


		public function getModules() {
			$query = $this->db->select("*")->from("tb_modules")->get();
			if ($query->num_rows() > 0) {
				$rs = $query->result_array();
				return $rs;
			}
			return null;
				
		}
	
	*/
	}
?>
