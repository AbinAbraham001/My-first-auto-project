import copy
import random
import xml.etree.ElementTree as ET
from xml.dom import minidom

INPUT_XML = "Enfuce_Embossing_826007_20241121_0000061_ALLPAY_EXT_PERSO_T&E_2recordsfile1_.xml"
OUTPUT_XML = "Enfuce_Embossing_826007_20241121_0000061_ALLPAY_EXT_PERSO_T&E_Bulk5000.xml"
NUMBER_OF_RECORDS = 5000


def format_xml(element):
    rough_string = ET.tostring(element, encoding="utf-8")
    reparsed = minidom.parseString(rough_string)
    return reparsed.toprettyxml(indent="    ")


def get_alpha_name(index):
    """
    Generates:
    TESTERA
    TESTERB
    ...
    TESTERZ
    TESTERAA
    TESTERAB
    ...
    TESTERAAA
    """
    result = ""

    while index > 0:
        index -= 1
        result = chr(65 + (index % 26)) + result
        index //= 26

    return f"TESTER{result}"


tree = ET.parse(INPUT_XML)
root = tree.getroot()

records_node = root.find("records")
template_record = copy.deepcopy(records_node.find("record"))

records_node.clear()

for i in range(1, NUMBER_OF_RECORDS + 1):

    record = copy.deepcopy(template_record)

    # Alphabetic name only
    name = get_alpha_name(i)

    # Generate unique PAN beginning with 550280
    pan = f"550280{random.randint(1000000000, 9999999999)}"

    # Application section
    application = record.find("./applications/application")

    application.find("cardNumber").text = pan
    application.find("cardId").text = str(97583111 + i)
    application.find("referenceNumber").text = str(8260075376625219 + i)
    application.find("accountNumber").text = str(826007429829234 + i)

    security = application.find("securityValues")

    cvc1 = str(random.randint(100, 999))
    cvc2 = str(random.randint(100, 999))
    icvv = str(random.randint(100, 999))
    pvvc = str(random.randint(1000, 9999))

    security.find("CVC1").text = cvc1
    security.find("CVC2").text = cvc2
    security.find("ICVV").text = icvv
    security.find("PVVC").text = pvvc

    # Track values
    security.find(
        "track1"
    ).text = f"B{pan}^{name}/TEST           ^2611226{pvvc}00{cvc1}000000"

    security.find(
        "track2"
    ).text = f"{pan}=2611226{pvvc}{cvc1}00000"

    security.find(
        "track57"
    ).text = f"{pan}D2611226{pvvc}{icvv}00000F"

    # Cardholder section
    cardholder = record.find("cardholder")

    cardholder.find("cardholderId").text = str(3652145379 + i)

    # Remove "TESTERONE", "TESTER00001" style names
    cardholder.find("lastName").text = name
    cardholder.find("embossingName").text = f"TEST {name}"

    email = cardholder.find("email")
    if email is not None:
        email.text = f"{name.lower()}@example.com"

    # Record identifiers
    record.find("recordId").text = f"{i:05d}"
    record.find("sequenceNumber").text = str(i)

    # Keep mandatory values unchanged
    for addinfo in record.findall("./addInfos/addInfo"):

        type_node = addinfo.find("type")
        value_node = addinfo.find("value")

        if type_node is not None:

            if type_node.text == "EMB_1":
                value_node.text = "ALL005"

            elif type_node.text == "EMB_5":
                value_node.text = "Card Only"

    records_node.append(record)

# Update record count
num_records = root.find("numberOfRecords")

if num_records is not None:
    num_records.text = str(NUMBER_OF_RECORDS)

with open(OUTPUT_XML, "w", encoding="utf-8") as f:
    f.write(format_xml(root))

print(f"{NUMBER_OF_RECORDS} unique records created in {OUTPUT_XML}")